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
    <div className="flex items-center gap-2 p-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire un message..."
        className="
          flex-1
          rounded-md
          border
          border-violet-500/30

          bg-[#1E1D23]

          px-3
          py-2
          text-sm

          focus:ring-2
          focus:ring-violet-500
        "
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
      />

      <Button
        size="icon"
        onClick={handleSend}
        className="
          bg-violet-700
          hover:bg-violet-800
          text-white
        "
        data-testid="send-message-button"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
