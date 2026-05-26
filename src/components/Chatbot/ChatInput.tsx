'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shadcn/ui/button';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({
  onSendMessage,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 border-t p-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire un message..."
        className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
      />

      <Button
        size="icon"
        onClick={handleSend}
        data-testid="send-message-button"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
