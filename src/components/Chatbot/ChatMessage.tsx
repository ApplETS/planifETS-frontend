'use client';

import type { ChatMessage as ChatMessageType } from './types';
import { useTranslations } from 'next-intl';

type ChatMessageProps = Readonly<{
  message: ChatMessageType;
}>;

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const t = useTranslations('Chatbot');
  const isUser = message.role === 'user';
  const showMetadata = !isUser && !message.isLoading && !message.isStreaming
    && !message.error && !!message.model && message.durationMs !== undefined;

  if (message.isLoading) {
    return (
      <output className="px-1 text-sm text-muted-foreground">
        {message.content}
        <span aria-hidden="true">...</span>
      </output>
    );
  }

  return (
    <div
      className={`group flex w-full flex-col ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div
        aria-busy={message.isStreaming || undefined}
        // Allow keyboard users to reveal the same metadata as mouse users.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={showMetadata ? 0 : undefined}
        aria-describedby={showMetadata ? `response-metadata-${message.id}` : undefined}
        className={`
          max-w-[80%]
          rounded-lg
          px-4
          py-2
          text-sm
          shadow-sm
          ${
    isUser
      ? 'bg-violet-600 text-white'
      : 'bg-muted text-foreground'
    }
        `}
      >
        <span className="whitespace-pre-wrap">
          {message.content}
        </span>
        {message.error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {message.error}
          </p>
        )}
        {message.isStreaming && (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block animate-pulse motion-reduce:animate-none"
            data-testid="chatbot-streaming-indicator"
          >
            ▍
          </span>
        )}
      </div>
      {showMetadata && (
        <span
          id={`response-metadata-${message.id}`}
          data-testid="chatbot-response-metadata"
          className="mt-1 px-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100"
        >
          {t('responseMetadata', { model: message.model!, seconds: Math.round(message.durationMs! / 1000) })}
        </span>
      )}
      {message.interrupted && isUser && (
        <output className="mt-4 flex w-full items-center gap-3 text-xs text-muted-foreground">
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-transparent to-muted-foreground/40" />
          <span className="shrink-0">{t('interruptedNotice')}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-linear-to-l from-transparent to-muted-foreground/40" />
        </output>
      )}
    </div>
  );
}
