'use client';

import { ArrowUp, Square } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';

type ChatInputProps = {
  readonly onSendMessage: (message: string) => void;
  readonly onCancel: () => void;
  readonly disabled?: boolean;
};

export default function ChatInput({
  onSendMessage,
  onCancel,
  disabled = false,
}: ChatInputProps) {
  const t = useTranslations('Chatbot');
  const [message, setMessage] = useState('');
  const hasMessage = Boolean(message.trim());

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="p-3 pt-2">
      <div className="relative">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="h-10 rounded-xl bg-input pr-11 text-left focus-visible:border-input focus-visible:ring-0 focus-visible:shadow-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />

        <Button
          type="button"
          size="icon"
          aria-label={disabled && !hasMessage ? t('stopButtonAriaLabel') : t('sendButtonAriaLabel')}
          onClick={disabled && !hasMessage ? onCancel : handleSend}
          disabled={!hasMessage && !disabled}
          className="
            absolute
            top-1/2
            right-1.5
            size-7
            -translate-y-1/2
            rounded-full
          "
          data-testid={disabled && !hasMessage ? 'stop-message-button' : 'send-message-button'}
        >
          {disabled && !hasMessage
            ? <Square className="size-3 fill-current" />
            : <ArrowUp className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
