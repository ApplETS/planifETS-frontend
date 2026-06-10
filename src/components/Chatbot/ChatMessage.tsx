'use client';

import type { ChatMessage as ChatMessageType } from './types';

type ChatMessageProps = {
  message: ChatMessageType;
};

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
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
        {message.content}
      </div>
    </div>
  );
}
