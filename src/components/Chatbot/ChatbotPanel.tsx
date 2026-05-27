'use client';

import type { ChatMessage as ChatMessageType } from './types';

import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shadcn/ui/button';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { mockMessages } from './mock';

export default function ChatbotPanel() {
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
        right-0
        top-0
        z-40
        flex
        h-screen
        w-full
        max-w-[420px]
        flex-col
        border-l
        bg-background
        shadow-2xl

        md:w-[420px]

        max-md:max-w-full
      "
      data-testid="chatbot-panel"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b p-4">
        <div>
          <h2 className="font-semibold">
            Assistant PlanifETS
          </h2>

          <p className="text-sm text-muted-foreground">
            Posez vos questions sur votre cheminement.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-testid="close-chatbot-button"
        >
          <X className="h-5 w-5" />
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
