'use client';

import type { ResolvedRecommendationCardData } from './recommendations';
import type { ChatMessage as ChatMessageType } from './types';
import type {
  ChatbotCourseSuggestionDto,
  ChatbotStreamStatus,
} from '@/api/types';

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
import { buildRecommendationCards, hasCourseDescription } from './recommendations';

type ChatbotPanelProps = {
  onClose: () => void;
};

function updateLoadingAssistantMessage(
  messages: ChatMessageType[],
  loadingMessageId: string,
  newContent: string,
  isLoading = false,
): ChatMessageType[] {
  return messages.map((message) =>
    message.id === loadingMessageId
      ? { ...message, content: newContent, isLoading }
      : message,
  );
}

export default function ChatbotPanel({
  onClose,
}: ChatbotPanelProps) {
  const DESCRIPTION_SUMMARY_MAX_LENGTH = 180;
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
  const [suggestedCourses, setSuggestedCourses] = useState<ResolvedRecommendationCardData[]>([]);
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

    return resolvedCards.filter(hasCourseDescription);
  };

  const isLlmExhaustedError = (error: unknown) => {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    const statusCode = 'statusCode' in error ? (error as { statusCode?: unknown }).statusCode : undefined;
    const message = 'message' in error ? (error as { message?: unknown }).message : undefined;

    return statusCode === 500
      && typeof message === 'string'
      && message.includes(t('llmExhaustedErrorMessage'));
  };

  const summarizeCourseDescription = (description: string) => {
    const normalized = description.replace(/\s+/g, ' ').trim();

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
      content: t('searchingCourses'),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setSuggestedCourses([]);
    setLoading(true);

    const updateAssistantMessage = (nextContent: string) => {
      setMessages((prev) =>
        updateLoadingAssistantMessage(prev, loadingMessageId, nextContent),
      );
    };

    const updateStatus = (status: ChatbotStreamStatus) => {
      setMessages((prev) =>
        updateLoadingAssistantMessage(
          prev,
          loadingMessageId,
          t(status === 'SEARCHING_EMBEDDINGS' ? 'searchingCourses' : 'thinkingAi'),
          true,
        ),
      );
    };

    const handleFailure = (error: unknown) => {
      const rawErrorMessage = handleApiError(error);
      const streamErrorMap: Record<string, string> = {
        'Received an invalid chatbot status event.': t('invalidStatusEventError'),
        'Received an invalid chatbot reasoning event.': t('invalidReasoningEventError'),
        'Received an invalid chatbot courses event.': t('invalidCoursesEventError'),
        'The recommendation stream closed before returning courses.': t('streamClosedBeforeCoursesError'),
        'Unable to receive chatbot recommendations.': t('unableToReceiveRecommendationsError'),
      };
      const errorMessage = streamErrorMap[rawErrorMessage] ?? rawErrorMessage;

      showError(errorMessage);
      setSuggestedCourses([]);
      updateAssistantMessage(errorMessage);
      setLoading(false);
    };

    const runLegacyRecommendation = async () => {
      try {
        const response = await chatbotService.recommend({
          prompt: content,
          programIds: selectedProgramIds,
        });
        const resolvedCourses = await resolveSuggestedCourses(
          response.data.courses,
          response.data.explanation,
        );

        setSuggestedCourses(resolvedCourses);
        updateAssistantMessage(response.data.explanation);
        setLoading(false);
      } catch (error) {
        if (!isLlmExhaustedError(error)) {
          throw error;
        }

        const retrievalResponse = await courseService.retrieveCourses({
          query: content,
          context: selectedProgramIds.length > 0
            ? { programIds: selectedProgramIds }
            : undefined,
        });
        const retrievalSuggestions: ChatbotCourseSuggestionDto[] = retrievalResponse.data.courses
          .slice(0, 10)
          .map((course) => ({ code: course.code }));
        const resolvedCourses = await resolveSuggestedCourses(
          retrievalSuggestions,
          t('retrievalFallbackMessage'),
        );

        setSuggestedCourses(resolvedCourses);
        updateAssistantMessage(t('retrievalFallbackMessage'));
        setLoading(false);
      }
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
            onStatus: updateStatus,
            onReason: (reasonChunk) => {
              reasoning += reasonChunk;
              updateAssistantMessage(reasoning);
            },
            onCourses: async (courses) => {
              streamRef.current = null;

              try {
                const fallbackReason = reasoning || t('thinkingAi');
                const resolvedCourses = await resolveSuggestedCourses(courses, fallbackReason);

                setSuggestedCourses(resolvedCourses);
                updateAssistantMessage(reasoning || fallbackReason);
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
        inset-x-0
        top-16
        bottom-0
        z-40
        flex
        flex-col
        border
        border-violet-500/30
        bg-violet-50
        dark:border-violet-500/50
        dark:bg-background
        shadow-2xl
        lg:inset-x-auto
        lg:top-20
        lg:right-4
        lg:bottom-4
        lg:w-96
        lg:rounded-xl
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
      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {suggestedCourses.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">
              {t('recommendedCourses')}
            </div>
            {suggestedCourses.map((course) => (
              <div key={course.code} className="rounded-lg border border-violet-200/70 bg-background/80 shadow-sm dark:border-border">
                <CourseCard course={course.course} />

                <p className="p-3 text-sm text-muted-foreground">
                  {summarizeCourseDescription(course.course.description)}
                </p>

                <div className="px-3 pb-3">
                  <Link
                    href={getCourseDetailsHref(course.course.id)}
                    className="text-sm font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-300"
                  >
                    {t('courseDetails')}
                  </Link>
                </div>
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
