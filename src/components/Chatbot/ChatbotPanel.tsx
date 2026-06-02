'use client';

import type { ChatMessage as ChatMessageType } from './types';

import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shadcn/ui/button';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { mockMessages } from './mock';

type ChatbotPanelProps = {
  onClose: () => void;
};

export default function ChatbotPanel({
  onClose,
}: ChatbotPanelProps) {
  const [messages, setMessages]
    = useState<ChatMessageType[]>(mockMessages);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Mock assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Ceci est une réponse mockée du chatbot PlanifETS.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div
      className="
        fixed
        top-20
        right-4

        z-40

        flex
        flex-col

        w-[380px]
        h-[calc(100vh-6rem)]

        rounded-xl

        border
        border-violet-500/30

        bg-secondary

        shadow-2xl
      "
      data-testid="chatbot-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500 dark:text-violet-300" />

          <span className="font-semibold">
            Assistant PlanifETS
          </span>

          <span
            className="
              rounded-md
              bg-violet-600/20
              dark:bg-violet-300/20
              px-2
              py-0.5
              text-xs
              font-medium
              text-violet-500
              dark:text-violet-300
            "
          >
            BETA
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          data-testid="close-chatbot-button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
