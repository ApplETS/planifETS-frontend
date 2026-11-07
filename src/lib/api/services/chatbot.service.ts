import type {
  ChatbotCourseSuggestionDto,
  ChatbotRecommendationStream,
  ChatbotRecommendStreamHandlers,
  ChatbotRecommendStreamRequestDto,
  ChatbotStreamStatus,
} from '../types';
import { API_ENDPOINTS } from '../endpoints';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

function buildStreamUrl(request: ChatbotRecommendStreamRequestDto): string {
  const url = new URL(API_ENDPOINTS.CHATBOT.RECOMMEND_STREAM, apiBaseUrl);

  url.searchParams.set('prompt', request.prompt);

  if (request.programIds && request.programIds.length > 0) {
    url.searchParams.set('programIds', request.programIds.join(';'));
  }

  return url.toString();
}

function parseJsonPayload(data: string): unknown {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function extractReason(data: string): string {
  const payload = parseJsonPayload(data);

  if (typeof payload === 'string') {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidate = ['reason', 'text', 'content', 'message', 'delta'].find(
      (key) => typeof (payload as Record<string, unknown>)[key] === 'string',
    );

    if (candidate) {
      return (payload as Record<string, string>)[candidate]!;
    }
  }

  // Older backends send plain text. A token such as "680" is still text,
  // even though JSON.parse can interpret it as a number.
  return data;
}

function extractCourses(data: string): ChatbotCourseSuggestionDto[] | null {
  const payload = parseJsonPayload(data);
  let courses: unknown = null;
  if (Array.isArray(payload)) {
    courses = payload;
  } else if (payload && typeof payload === 'object') {
    courses = (payload as Record<string, unknown>).courses;
  }

  if (!Array.isArray(courses)) {
    return null;
  }

  const valid = courses.every((course: unknown) => {
    if (!course || typeof course !== 'object') {
      return false;
    }
    const value = course as Record<string, unknown>;
    return typeof value.code === 'string' && value.code.trim().length > 0
      && (value.reason === undefined || typeof value.reason === 'string');
  });

  return valid ? courses as ChatbotCourseSuggestionDto[] : null;
}

function extractStatus(data: string): ChatbotStreamStatus | null {
  return data === 'SEARCHING_EMBEDDINGS' || data === 'THINKING_AI' ? data : null;
}

function getHttpError(status: number, payload: unknown): Error {
  const busy = status === 429 || (status === 503
    && !!payload && typeof payload === 'object' && 'message' in payload
    && payload.message === 'Chatbot is busy. Try again shortly.');
  if (busy) {
    return new Error('Chatbot is busy. Try again shortly.');
  }
  if (status === 504) {
    return new Error('Chatbot request timed out. Please try again.');
  }
  if (status === 400) {
    return new Error('Invalid chatbot request. Please rephrase your message.');
  }
  return new Error('Chatbot is temporarily unavailable. Please try again.');
}

function getConnectionError(error: unknown, connected: boolean): Error {
  if (!(error instanceof TypeError)) {
    return error instanceof Error ? error : new Error('Unable to receive chatbot recommendations.');
  }
  return new Error(connected
    ? 'The recommendation stream closed before returning courses.'
    : 'Unable to receive chatbot recommendations.');
}

async function* readEvents(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let type = 'message';
  let data: string[] = [];
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) {
        break;
      }
      buffer += decoder.decode(chunk.value, { stream: true });
      while (true) {
        const end = buffer.indexOf('\n');
        if (end === -1) {
          break;
        }
        const line = buffer.slice(0, end).replace(/\r$/, '');
        buffer = buffer.slice(end + 1);
        if (line === '') {
          if (data.length > 0) {
            yield { type, data: data.join('\n') };
          }
          type = 'message';
          data = [];
        } else if (line.startsWith('event:')) {
          type = line.slice(6).replace(/^ /, '');
        } else if (line.startsWith('data:')) {
          data.push(line.slice(5).replace(/^ /, ''));
        }
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export const chatbotService = {
  recommendStream(
    request: ChatbotRecommendStreamRequestDto,
    handlers: ChatbotRecommendStreamHandlers,
  ): ChatbotRecommendationStream {
    const controller = new AbortController();
    let completed = false;

    const close = () => {
      completed = true;
      controller.abort();
    };

    const run = async () => {
      let connected = false;
      try {
        const response = await fetch(buildStreamUrl(request), {
          headers: { Accept: 'text/event-stream' },
          signal: controller.signal,
        });
        if (completed) {
          return;
        }
        if (!response.ok) {
          const payload: unknown = await response.json().catch(() => null);
          throw getHttpError(response.status, payload);
        }
        if (!response.body || !response.headers.get('content-type')?.includes('text/event-stream')) {
          throw new Error('Chatbot is temporarily unavailable. Please try again.');
        }
        connected = true;
        for await (const event of readEvents(response.body)) {
          if (completed) {
            return;
          }
          if (event.type === 'status') {
            const status = extractStatus(event.data);
            if (!status) {
              throw new Error('Received an invalid chatbot status event.');
            }
            handlers.onStatus(status);
          } else if (event.type === 'reason') {
            const reason = extractReason(event.data);
            if (reason) {
              handlers.onReason(reason);
            }
          } else if (event.type === 'model') {
            // Optional metadata must not prevent a valid answer from completing.
            if (event.data.trim().length > 0 && event.data.length <= 200) {
              handlers.onModel?.(event.data.trim());
            }
          } else if (event.type === 'courses') {
            const courses = extractCourses(event.data);
            if (!courses) {
              throw new Error('Received an invalid chatbot courses event.');
            }
            close();
            handlers.onCourses(courses);
            return;
          } else if (event.type === 'error') {
            // Server diagnostics can contain internal details; show a safe message.
            throw new Error('Chatbot is temporarily unavailable. Please try again.');
          }
        }
        throw new Error('The recommendation stream closed before returning courses.');
      } catch (error) {
        if (completed) {
          return;
        }
        close();
        handlers.onError(getConnectionError(error, connected));
      }
    };
    void run();

    return { close };
  },
};
