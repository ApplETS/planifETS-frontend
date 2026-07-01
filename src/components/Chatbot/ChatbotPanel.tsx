'use client';

import type { RecommendationCardData } from './recommendations';
import type { ChatMessage as ChatMessageType } from './types';
import type { ChatbotCourseSuggestionDto } from '@/api/types';

import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { chatbotService } from '@/api/services/chatbot.service';
import { courseService } from '@/api/services/course.service';
import { handleApiError } from '@/api/utils/error-handler';
import CourseCard from '@/components/Sidebar/CourseCard';
import { showError } from '@/lib/toast';
import { Button } from '@/shadcn/ui/button';
import { mapApiCourseToAppCourse } from '@/utils/courseUtil';
import { getCourseDetailsHref } from '@/utils/routesUtil';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { buildRecommendationCards } from './recommendations';

type ChatbotPanelProps = {
  onClose: () => void;
};

export default function ChatbotPanel({
  onClose,
}: ChatbotPanelProps) {
  const t = useTranslations('Chatbot');
  const [messages, setMessages] = useState<ChatMessageType[]>(() => [
    {
      id: '1',
      role: 'assistant',
      content: t('initialMessage'),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState<RecommendationCardData[]>([]);

  const resolveSuggestedCourses = async (
    courses: ChatbotCourseSuggestionDto[],
    fallbackReason: string,
  ) => {
    const cards = buildRecommendationCards(courses, fallbackReason);

    const resolvedCards = await Promise.all(
      cards.map(async (card) => {
        try {
          const response = await courseService.searchCourses({
            query: card.code,
            limit: 1,
          });

          const course = response.data.courses[0]
            ? mapApiCourseToAppCourse(response.data.courses[0])
            : null;

          return {
            ...card,
            course,
          };
        } catch {
          return card;
        }
      }),
    );

    return resolvedCards.filter((card) => card.course ?? card.code);
  };

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
      const resolvedCourses = await resolveSuggestedCourses(
        response.data.courses,
        response.data.explanation,
      );

      setSuggestedCourses(resolvedCourses);

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

      setSuggestedCourses([]);

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

        {suggestedCourses.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">
              Cours recommandés
            </div>
            {suggestedCourses.map((course) => (
              <div key={course.code} className="rounded-lg border border-violet-200/70 bg-background/80 shadow-sm dark:border-violet-800/50">
                {course.course
                  ? (
                    <CourseCard course={course.course} />
                  )
                  : (
                    <div className="rounded-md border border-dashed border-violet-300/70 bg-violet-50/80 text-sm text-foreground dark:border-violet-700/70 dark:bg-violet-900/20">
                      <div className="font-semibold">{course.code}</div>
                    </div>
                  )}

                {course.reason && (
                  <p className="p-3 text-sm text-muted-foreground">
                    {course.reason}
                  </p>
                )}

                {course.course && (
                  <div className="px-3 pb-3">
                    <Link
                      href={getCourseDetailsHref(course.course.id)}
                      className="text-sm font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-300"
                    >
                      {t('courseDetails')}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}
