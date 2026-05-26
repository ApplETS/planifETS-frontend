'use client';

import type { ChatMessage as ChatMessageType } from './types';

import { useState } from 'react';
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
        bottom-24
        right-4
        z-50
        flex
        h-[600px]
        w-[380px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-background
        shadow-2xl

        max-md:
        w-[calc(100vw-2rem)]
        max-md:h-[70vh]
      "
      data-testid="chatbot-panel"
    >
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="font-semibold">
          Assistant PlanifETS
        </h2>

        <p className="text-sm text-muted-foreground">
          Posez vos questions sur votre cheminement.
        </p>
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
