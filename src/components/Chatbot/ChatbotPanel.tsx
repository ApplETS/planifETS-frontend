'use client';

import type { ChatMessage as ChatMessageType } from './types';
import type { ChatbotCourseSuggestionDto, ChatbotStreamStatus } from '@/api/types';

import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { chatbotService } from '@/api/services/chatbot.service';
import { courseService } from '@/api/services/course.service';
import { handleApiError } from '@/api/utils/error-handler';
import CourseCard from '@/components/Sidebar/CourseCard';
import { showError } from '@/lib/toast';
import { Button } from '@/shadcn/ui/button';
import { useProgramStore } from '@/store/programStore';
import { mapApiCourseToAppCourse } from '@/utils/courseUtil';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { buildRecommendationCards, hasResolvedCourse } from './recommendations';

type ChatbotPanelProps = Readonly<{
  onClose: () => void;
}>;

function updateLoadingAssistantMessage(
  messages: ChatMessageType[],
  loadingMessageId: string,
  newContent: string,
  isLoading = false,
  responseState: Pick<
    ChatMessageType,
    'isStreaming' | 'durationMs' | 'model' | 'error'
  > = {},
): ChatMessageType[] {
  return messages.map((message) =>
    message.id === loadingMessageId
      ? {
        ...message,
        content: newContent,
        isLoading,
        isStreaming: false,
        ...responseState,
      }
      : message,
  );
}

function updateMessageAfterCancel(
  message: ChatMessageType,
  activeMessageId: string | null,
  activeUserMessageId: string | null,
): ChatMessageType {
  if (message.id === activeUserMessageId) {
    return { ...message, interrupted: true };
  }
  if (message.id === activeMessageId) {
    return { ...message, isLoading: false, isStreaming: false };
  }
  return message;
}

export default function ChatbotPanel({ onClose }: ChatbotPanelProps) {
  const DESCRIPTION_SUMMARY_MAX_LENGTH = 180;
  const t = useTranslations('Chatbot');
  const tCommons = useTranslations('Commons');
  const programIds = useProgramStore((state) => state.selectedPrograms);
  const [messages, setMessages] = useState<ChatMessageType[]>(() => [
    {
      id: '1',
      role: 'assistant',
      content: t('initialMessage'),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [retryPrompt, setRetryPrompt] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    () => new Set(),
  );
  const [showProgramWarning, setShowProgramWarning] = useState(true);
  const streamRef = useRef<ReturnType<typeof chatbotService.recommendStream> | null>(
    null,
  );
  const cancelRequestRef = useRef<(() => void) | null>(null);
  const requestIdRef = useRef(0);
  const activeMessageIdRef = useRef<string | null>(null);
  const activeUserMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    posthog.capture('chatbot_opened');
    return () => {
      requestIdRef.current += 1;
      streamRef.current?.close();
      streamRef.current = null;
      cancelRequestRef.current?.();
    };
  }, []);

  const handleCancel = () => {
    requestIdRef.current += 1;
    streamRef.current?.close();
    streamRef.current = null;
    cancelRequestRef.current?.();
    cancelRequestRef.current = null;
    const activeMessageId = activeMessageIdRef.current;
    const activeUserMessageId = activeUserMessageIdRef.current;
    activeMessageIdRef.current = null;
    activeUserMessageIdRef.current = null;
    setMessages((prev) =>
      prev
        .filter((message) => message.id !== activeMessageId || !message.isLoading)
        .map((message) =>
          updateMessageAfterCancel(message, activeMessageId, activeUserMessageId),
        ),
    );
    setLoading(false);
  };

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

    return resolvedCards.filter(hasResolvedCourse);
  };

  const handleSendMessage = async (content: string) => {
    if (loading) {
      handleCancel();
    }
    posthog.capture('chatbot_request_submitted', {
      is_retry: retryPrompt === content,
      selected_program_count: programIds.length,
    });
    setRetryPrompt(null);
    const startedAt = performance.now();
    let reasoning = '';
    let model: string | undefined;
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };

    const loadingMessageId = crypto.randomUUID();
    activeMessageIdRef.current = loadingMessageId;
    activeUserMessageIdRef.current = userMessage.id;
    const loadingMessage: ChatMessageType = {
      id: loadingMessageId,
      role: 'assistant',
      content: t('searchingCourses'),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setLoading(true);
    const requestId = ++requestIdRef.current;

    const updateAssistantMessage = (
      nextContent: string,
      responseState: Pick<
        ChatMessageType,
        'isStreaming' | 'durationMs' | 'model' | 'error'
      > = {},
    ) => {
      if (requestId !== requestIdRef.current) {
        return;
      }
      setMessages((prev) =>
        updateLoadingAssistantMessage(
          prev,
          loadingMessageId,
          nextContent,
          false,
          responseState,
        ),
      );
    };

    const completeAssistantMessage = (nextContent: string) => {
      if (requestId !== requestIdRef.current) {
        return;
      }
      updateAssistantMessage(nextContent, {
        durationMs: performance.now() - startedAt,
        model,
      });
      setLoading(false);
    };

    const updateStatus = (status: ChatbotStreamStatus) => {
      if (requestId !== requestIdRef.current) {
        return;
      }
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
      if (requestId !== requestIdRef.current) {
        return;
      }
      const rawErrorMessage = handleApiError(error);
      const streamErrorMap: Record<string, string> = {
        'Chatbot is busy. Try again shortly.': t('busyError'),
        'Chatbot is temporarily unavailable. Please try again.': t('unavailableError'),
        'Chatbot request timed out. Please try again.': t('timeoutError'),
        'Invalid chatbot request. Please rephrase your message.':
          t('invalidRequestError'),
        'Received an invalid chatbot status event.': t('invalidStatusEventError'),
        'Received an invalid chatbot reasoning event.': t('invalidReasoningEventError'),
        'Received an invalid chatbot courses event.': t('invalidCoursesEventError'),
        'The recommendation stream closed before returning courses.': t(
          'streamClosedBeforeCoursesError',
        ),
        'Unable to receive chatbot recommendations.': t(
          'unableToReceiveRecommendationsError',
        ),
      };
      const errorMessage = streamErrorMap[rawErrorMessage] ?? rawErrorMessage;

      showError(errorMessage);
      updateAssistantMessage(reasoning || errorMessage, {
        error: reasoning ? errorMessage : undefined,
      });
      setLoading(false);
      setRetryPrompt(content);
    };

    try {
      streamRef.current?.close();
      streamRef.current = null;

      await new Promise<void>((resolve, reject) => {
        cancelRequestRef.current = () =>
          reject(new DOMException('Request cancelled', 'AbortError'));
        streamRef.current = chatbotService.recommendStream(
          {
            prompt: content,
            programIds,
          },
          {
            onStatus: (status) => {
              if (requestId !== requestIdRef.current) {
                return;
              }
              if (!reasoning) {
                updateStatus(status);
              }
            },
            onReason: (reasonChunk) => {
              if (requestId !== requestIdRef.current) {
                return;
              }
              reasoning += reasonChunk;
              updateAssistantMessage(reasoning, { isStreaming: true });
            },
            onModel: (modelName) => {
              model = modelName;
            },
            onCourses: async (courses) => {
              if (requestId !== requestIdRef.current) {
                return;
              }
              streamRef.current = null;

              try {
                const fallbackReason = reasoning || t('thinkingAi');
                const resolvedCourses = await resolveSuggestedCourses(
                  courses,
                  fallbackReason,
                );
                if (requestId !== requestIdRef.current) {
                  return;
                }

                setMessages((prev) =>
                  prev.map((message) =>
                    message.id === loadingMessageId
                      ? { ...message, suggestedCourses: resolvedCourses }
                      : message,
                  ),
                );
                completeAssistantMessage(reasoning || fallbackReason);
                resolve();
              } catch (error) {
                reject(error);
              }
            },
            onError: (error) => {
              if (requestId !== requestIdRef.current) {
                return;
              }
              streamRef.current = null;
              // Never replace a streamed reply with a second model request.
              reject(error);
            },
          },
        );
      }).finally(() => {
        if (requestId === requestIdRef.current) {
          cancelRequestRef.current = null;
          activeMessageIdRef.current = null;
          activeUserMessageIdRef.current = null;
        }
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

          <span className="font-semibold">{t('buttonLabel')}</span>

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
          <div key={message.id} className="space-y-1">
            <ChatMessage message={message} />
            {!!message.suggestedCourses?.length && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-foreground">
                  {t('recommendedCourses')}
                </div>
                {message.suggestedCourses.map((course) => {
                  const descriptionId = `${message.id}:${course.code}`;
                  const description =
                    course.course.description?.trim() || course.reason || '';
                  const isExpanded = expandedDescriptions.has(descriptionId);
                  const isLong = description.length > DESCRIPTION_SUMMARY_MAX_LENGTH;

                  return (
                    <CourseCard
                      key={course.code}
                      course={course.course}
                      className="select-none rounded-lg border border-violet-200/70 bg-background/80 shadow-sm dark:border-border"
                    >
                      <p
                        className={`pt-3 text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-3'}`}
                      >
                        {description}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          className="pt-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-300"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedDescriptions((expanded) => {
                              const next = new Set(expanded);
                              if (isExpanded) {
                                next.delete(descriptionId);
                              } else {
                                next.add(descriptionId);
                              }
                              return next;
                            })
                          }
                        >
                          {tCommons(isExpanded ? 'showLess' : 'showMore')}
                        </button>
                      )}
                    </CourseCard>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {retryPrompt !== null && !loading && (
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleSendMessage(retryPrompt)}
          >
            {tCommons('retry')}
          </Button>
        )}
      </div>

      {/* Input */}
      {programIds.length === 0 && showProgramWarning && (
        <output className="flex items-start justify-between gap-2 px-4 pb-2 text-sm text-amber-700 dark:text-amber-300">
          <p>{t('selectProgramWarning')}</p>
          <button
            type="button"
            className="shrink-0 rounded-sm hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('dismissProgramWarning')}
            onClick={() => setShowProgramWarning(false)}
          >
            <X className="size-4" />
          </button>
        </output>
      )}
      <ChatInput
        onSendMessage={handleSendMessage}
        onCancel={handleCancel}
        disabled={loading}
      />
    </div>
  );
}
