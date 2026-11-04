import type { ChatbotRecommendStreamHandlers } from '../../src/lib/api/types/chatbot';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { chatbotService } from '../../src/lib/api/services/chatbot.service';

describe('chatbot fetch SSE transport', () => {
  let handlers: ChatbotRecommendStreamHandlers;
  let source: ReadableStreamDefaultController<Uint8Array>;
  let fetchMock: ReturnType<typeof vi.fn>;
  const encoder = new TextEncoder();
  const emit = (type: string, data: string) => source.enqueue(encoder.encode(
    `event: ${type}\n${data.split('\n').map((line) => `data: ${line}`).join('\n')}\n\n`,
  ));

  beforeEach(() => {
    handlers = { onStatus: vi.fn(), onReason: vi.fn(), onCourses: vi.fn(), onError: vi.fn() };
    const body = new ReadableStream<Uint8Array>({ start(controller) {
      source = controller;
    } });
    fetchMock = vi.fn().mockResolvedValue(new Response(body, {
      headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
    }));
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('passes the actual model name from the stream to the caller', async () => {
    handlers.onModel = vi.fn();
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('model', 'gemma-4-e2b-it-qat');
    emit('courses', '[]');
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledWith([]));

    expect(handlers.onModel).toHaveBeenCalledWith('gemma-4-e2b-it-qat');
  });

  it.each([' ', 'x'.repeat(201)])('ignores invalid optional model metadata', async (model) => {
    handlers.onModel = vi.fn();
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('model', model);
    emit('courses', '[]');
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledWith([]));

    expect(handlers.onModel).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('encodes the prompt and programs, sends Accept, and supports cancellation', () => {
    const stream = chatbotService.recommendStream({ prompt: 'ÉTS & Python?', programIds: [42, 99] }, handlers);
    const [address, options] = fetchMock.mock.calls[0]!;
    const url = new URL(address);

    expect(url.pathname).toBe('/api/chatbot/recommend/stream');
    expect(url.searchParams.get('prompt')).toBe('ÉTS & Python?');
    expect(url.searchParams.get('programIds')).toBe('42;99');
    expect(options.headers.Accept).toBe('text/event-stream');

    stream.close();

    expect(options.signal.aborted).toBe(true);
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('streams text immediately and treats an empty course list as success', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps', programIds: [] }, handlers);

    expect(new URL(fetchMock.mock.calls[0]![0]).searchParams.has('programIds')).toBe(false);

    emit('status', 'SEARCHING_EMBEDDINGS');
    emit('status', 'THINKING_AI');
    emit('reason', JSON.stringify('Hello\nworld'));
    await vi.waitFor(() => expect(handlers.onReason).toHaveBeenCalledWith('Hello\nworld'));

    expect(handlers.onCourses).not.toHaveBeenCalled();

    emit('courses', '[]');
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledWith([]));

    expect(handlers.onStatus).toHaveBeenCalledTimes(2);
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it.each(['reason', 'text', 'content', 'message', 'delta'])('accepts a reasoning wrapper: %s', async (key) => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('reason', JSON.stringify({ [key]: 'Partial text' }));
    emit('courses', '[]');
    await vi.waitFor(() => expect(handlers.onReason).toHaveBeenCalledWith('Partial text'));
  });

  it.each(['80', '7', '42', '0', 'true', 'false', 'null', '{}', '[]'])('preserves plain-text JSON-like tokens: %s', async (chunk) => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('reason', chunk);
    emit('courses', '[]');
    await vi.waitFor(() => expect(handlers.onReason).toHaveBeenCalledWith(chunk));
  });

  it('handles split UTF-8, CRLF boundaries, multiple data lines, and comments', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    const bytes = encoder.encode(': heartbeat\r\nevent: reason\r\ndata: ÉTS\r\ndata: français\r\n\r\nevent: courses\r\ndata: []\r\n\r\n');
    for (const byte of bytes) {
      source.enqueue(Uint8Array.of(byte));
    }
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledWith([]));

    expect(handlers.onReason).toHaveBeenCalledWith('ÉTS\nfrançais');
  });

  it.each(['[{"code":"LOG680","reason":"CI/CD"}]', '{"courses":[{"code":"LOG680"}]}'])('accepts course payload: %s', async (payload) => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('courses', payload);
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ code: 'LOG680' })])));
  });

  it.each([
    ['status', 'UNKNOWN'],
    ['courses', 'not-json'],
    ['courses', '[null]'],
    ['courses', '[{}]'],
    ['courses', '[{"code":42}]'],
    ['courses', '{"courses":[{"code":""}]}'],
    ['courses', '[{"code":"LOG680","reason":42}]'],
  ])('rejects invalid %s data: %s', async (type, payload) => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit(type!, payload!);
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledOnce());

    expect(handlers.onCourses).not.toHaveBeenCalled();
  });

  it.each([
    [503, 'Chatbot is busy. Try again shortly.', 'Chatbot is busy. Try again shortly.'],
    [503, 'internal diagnostic', 'Chatbot is temporarily unavailable. Please try again.'],
    [500, 'internal diagnostic', 'Chatbot is temporarily unavailable. Please try again.'],
    [429, 'limited', 'Chatbot is busy. Try again shortly.'],
    [504, 'timeout', 'Chatbot request timed out. Please try again.'],
    [400, 'invalid input', 'Invalid chatbot request. Please rephrase your message.'],
    [404, 'disabled', 'Chatbot is temporarily unavailable. Please try again.'],
  ])('maps HTTP %s without leaking diagnostics', async (status, message, expected) => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message }), { status: status as number }));
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: expected })));

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('handles a non-JSON proxy error', async () => {
    fetchMock.mockResolvedValue(new Response('<html>Bad gateway</html>', { status: 502 }));
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Chatbot is temporarily unavailable. Please try again.' })));
  });

  it('rejects an unexpected successful HTML response', async () => {
    fetchMock.mockResolvedValue(new Response('<html>Proxy page</html>', { headers: { 'Content-Type': 'text/html' } }));
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Chatbot is temporarily unavailable. Please try again.' })));
  });

  it('reports network failure after streaming started as an interrupted response', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('reason', 'Partial answer');
    await vi.waitFor(() => expect(handlers.onReason).toHaveBeenCalledOnce());
    source.error(new TypeError('Network connection lost'));
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'The recommendation stream closed before returning courses.' })));

    expect(handlers.onCourses).not.toHaveBeenCalled();
  });

  it('distinguishes connection failure from an interrupted response', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unable to receive chatbot recommendations.' })));
  });

  it('preserves partial text and reports premature EOF', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('reason', 'Partial answer');
    source.close();
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'The recommendation stream closed before returning courses.' })));

    expect(handlers.onReason).toHaveBeenCalledWith('Partial answer');
    expect(handlers.onCourses).not.toHaveBeenCalled();
  });

  it('handles server error events safely and only once', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('error', 'secret provider diagnostic');
    source.close();
    await vi.waitFor(() => expect(handlers.onError).toHaveBeenCalledOnce());

    expect(handlers.onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Chatbot is temporarily unavailable. Please try again.' }));
  });

  it('ignores queued data after success or explicit cancellation', async () => {
    chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('courses', '[]');
    emit('reason', 'too late');
    source.close();
    await vi.waitFor(() => expect(handlers.onCourses).toHaveBeenCalledOnce());

    expect(handlers.onReason).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('silences abort failures during an active stream', async () => {
    const stream = chatbotService.recommendStream({ prompt: 'DevOps' }, handlers);
    emit('reason', 'Partial answer');
    await vi.waitFor(() => expect(handlers.onReason).toHaveBeenCalledOnce());
    stream.close();
    source.error(new DOMException('Aborted', 'AbortError'));
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(handlers.onError).not.toHaveBeenCalled();
  });
});
