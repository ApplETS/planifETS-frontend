'use client';

import type { ChatMessage as ChatMessageType } from './types';
import type { ChatbotCourseSuggestionDto } from '@/api/types';

import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { chatbotService } from '@/api/services/chatbot.service';
import { handleApiError } from '@/api/utils/error-handler';
import { showError } from '@/lib/toast';
import { Button } from '@/shadcn/ui/button';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

type ChatbotPanelProps = {
  onClose: () => void;
};

export default function ChatbotPanel({
  onClose,
}: ChatbotPanelProps) {
  const t = useTranslations('Chatbot');
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('initialMessage'),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState<ChatbotCourseSuggestionDto[]>([]);
  void suggestedCourses;

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    const loadingMessageId = crypto.randomUUID();
    const loadingMessage: ChatMessageType = {
      id: loadingMessageId,
      role: 'assistant',
      content: '...',
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setLoading(true);

    try {
      const response = await chatbotService.recommend({ prompt: content });
      setSuggestedCourses(response.data.courses);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessageId
            ? { ...message, content: response.data.explanation }
            : message,
        ),
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      showError(errorMessage);

      setMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessageId
            ? { ...message, content: errorMessage }
            : message,
        ),
      );
    } finally {
      setLoading(false);
    }
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

        w-[350px]
        h-[calc(100vh-6rem)]

        rounded-xl

        border
        border-violet-500/30

        bg-violet-100/50 dark:bg-violet-900/30

        shadow-2xl
      "
      data-testid="chatbot-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/30 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500 dark:text-violet-300" />

          <span className="font-semibold">
            {t('buttonLabel')}
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
            {t('beta')}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          data-testid="close-chatbot-button"
          aria-label={t('closeButtonAriaLabel')}
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
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}
