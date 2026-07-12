'use client';

import type { RecommendationCardData } from './recommendations';
import type { ChatMessage as ChatMessageType } from './types';
import type { ChatbotCourseSuggestionDto } from '@/api/types';

import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { chatbotService } from '@/api/services/chatbot.service';
import { courseService } from '@/api/services/course.service';
import { handleApiError } from '@/api/utils/error-handler';
import CourseCard from '@/components/Sidebar/CourseCard';
import { CHATBOT_SSE_ENABLED } from '@/config/chatbot';
import { showError } from '@/lib/toast';
import { Button } from '@/shadcn/ui/button';
import { useProgramStore } from '@/store/programStore';
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
  const DESCRIPTION_SUMMARY_MAX_LENGTH = 180;
  const DESCRIPTION_FALLBACK = 'No course description available.';
  const t = useTranslations('Chatbot');
  const selectedProgramIds = useProgramStore((state) => state.getSelectedProgramIds());
  const [messages, setMessages] = useState<ChatMessageType[]>(() => [
    {
      id: '1',
      role: 'assistant',
      content: t('initialMessage'),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState<RecommendationCardData[]>([]);
  const streamRef = useRef<ReturnType<typeof chatbotService.recommendStream> | null>(null);

  useEffect(() => () => {
    streamRef.current?.close();
    streamRef.current = null;
  }, []);

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

          const mappedCourse = response.data.courses[0]
            ? mapApiCourseToAppCourse(response.data.courses[0])
            : null;

          let course = mappedCourse;

          if (mappedCourse) {
            try {
              const detailsResponse = await courseService.getCourseById(mappedCourse.id);
              course = {
                ...mappedCourse,
                description: detailsResponse.data.description,
              };
            } catch {
              course = mappedCourse;
            }
          }

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

  const summarizeCourseDescription = (description?: string) => {
    const normalized = description?.replace(/\s+/g, ' ').trim();

    if (!normalized) {
      return DESCRIPTION_FALLBACK;
    }

    if (normalized.length <= DESCRIPTION_SUMMARY_MAX_LENGTH) {
      return normalized;
    }

    return `${normalized.slice(0, DESCRIPTION_SUMMARY_MAX_LENGTH).trimEnd()}...`;
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
    setSuggestedCourses([]);
    setLoading(true);

    const setAssistantMessage = (nextContent: string) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessageId
            ? { ...message, content: nextContent }
            : message,
        ),
      );
    };

    const handleFailure = (error: unknown) => {
      const errorMessage = handleApiError(error);

      showError(errorMessage);
      setSuggestedCourses([]);
      setAssistantMessage(errorMessage);
      setLoading(false);
    };

    const runLegacyRecommendation = async () => {
      const response = await chatbotService.recommend({ prompt: content });
      const resolvedCourses = await resolveSuggestedCourses(
        response.data.courses,
        response.data.explanation,
      );

      setSuggestedCourses(resolvedCourses);
      setAssistantMessage(response.data.explanation);
      setLoading(false);
    };

    try {
      streamRef.current?.close();
      streamRef.current = null;

      if (!CHATBOT_SSE_ENABLED) {
        await runLegacyRecommendation();
        return;
      }

      await new Promise<void>((resolve, reject) => {
        let reasoning = '';

        streamRef.current = chatbotService.recommendStream(
          {
            prompt: content,
            programIds: selectedProgramIds,
          },
          {
            onReason: (reasonChunk) => {
              reasoning += reasonChunk;
              setAssistantMessage(reasoning);
            },
            onCourses: async (courses) => {
              streamRef.current = null;

              try {
                const fallbackReason = reasoning || '...';
                const resolvedCourses = await resolveSuggestedCourses(courses, fallbackReason);

                setSuggestedCourses(resolvedCourses);
                setAssistantMessage(reasoning || fallbackReason);
                setLoading(false);
                resolve();
              } catch (error) {
                reject(error);
              }
            },
            onError: async (error) => {
              streamRef.current = null;

              try {
                await runLegacyRecommendation();
                resolve();
              } catch {
                reject(error);
              }
            },
          },
        );
      });
    } catch (error) {
      handleFailure(error);
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

                <p className="p-3 text-sm text-muted-foreground">
                  {summarizeCourseDescription(course.course?.description)}
                </p>

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
