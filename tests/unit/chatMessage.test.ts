import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import ChatMessage from '@/components/Chatbot/ChatMessage';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { model: string; seconds: number }) =>
    key === 'responseMetadata' ? `${values!.model} · ${values!.seconds}s` : 'Interrupted',
}));

describe('ChatMessage interruption notice', () => {
  it('renders below the user bubble with spaced, fading solid lines around the label', () => {
    const html = renderToStaticMarkup(createElement(ChatMessage, {
      message: { id: '1', role: 'user', content: 'hey broski', interrupted: true },
    }));

    expect(html).toMatch(/hey broski<\/span><\/div><div class="mt-4 flex w-full[^"]*" role="status">/);
    expect(html).toContain('h-px flex-1 bg-linear-to-r from-transparent to-muted-foreground/40');
    expect(html).toContain('h-px flex-1 bg-linear-to-l from-transparent to-muted-foreground/40');
    expect(html).toContain('<span class="shrink-0">Interrupted</span>');
  });

  it('does not render a notice for uninterrupted messages or assistant messages', () => {
    for (const role of ['user', 'assistant'] as const) {
      const html = renderToStaticMarkup(createElement(ChatMessage, {
        message: { id: '1', role, content: 'Hello', interrupted: role === 'assistant' },
      }));

      expect(html).not.toContain('role="status"');
    }
  });
});

describe('ChatMessage response metadata', () => {
  const message = { id: 'reply', role: 'assistant' as const, content: 'Hello', model: 'gemma-4-e2b-it-qat', durationMs: 29000 };

  it('renders model and request duration with hover and keyboard focus styles', () => {
    const html = renderToStaticMarkup(createElement(ChatMessage, { message }));

    expect(html).toContain('gemma-4-e2b-it-qat · 29s');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('aria-describedby="response-metadata-reply"');
    expect(html).toContain('opacity-0');
    expect(html).toContain('group-hover:opacity-100');
    expect(html).toContain('group-focus-within:opacity-100');
  });

  it.each([
    { role: 'user' as const },
    { isStreaming: true },
    { isLoading: true },
    { error: 'Failed' },
    { model: undefined },
    { durationMs: undefined },
  ])('hides metadata for incomplete or non-generated messages: %o', (overrides) => {
    const html = renderToStaticMarkup(createElement(ChatMessage, { message: { ...message, ...overrides } }));

    expect(html).not.toContain('data-testid="chatbot-response-metadata"');
  });
});
