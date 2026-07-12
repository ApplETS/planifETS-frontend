import type {
  ChatbotCourseSuggestionDto,
  ChatbotRecommendationStream,
  ChatbotRecommendRequestDto,
  ChatbotRecommendResponseDto,
  ChatbotRecommendStreamHandlers,
  ChatbotRecommendStreamRequestDto,
} from '../types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

function buildStreamUrl(request: ChatbotRecommendStreamRequestDto): string {
  const url = new URL(API_ENDPOINTS.CHATBOT.RECOMMEND_STREAM, apiBaseUrl);

  url.searchParams.set('prompt', request.prompt);

  if (request.programIds && request.programIds.length > 0) {
    url.searchParams.set('programIds', request.programIds.join(';'));
  }

  return url.toString();
}

function parseJsonPayload(data: string): unknown {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function extractReason(data: string): string | null {
  const payload = parseJsonPayload(data);

  if (typeof payload === 'string') {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidate = [
      'reason',
      'text',
      'content',
      'message',
      'delta',
    ].find((key) => typeof (payload as Record<string, unknown>)[key] === 'string');

    if (candidate) {
      return (payload as Record<string, string | undefined>)[candidate] ?? null;
    }
  }

  return null;
}

function extractCourses(data: string): ChatbotCourseSuggestionDto[] | null {
  const payload = parseJsonPayload(data);

  if (Array.isArray(payload) && payload.every((course) => typeof course === 'object' && course !== null)) {
    return payload as ChatbotCourseSuggestionDto[];
  }

  if (payload && typeof payload === 'object') {
    const courses = (payload as Record<string, unknown>).courses;

    if (Array.isArray(courses) && courses.every((course) => typeof course === 'object' && course !== null)) {
      return courses as ChatbotCourseSuggestionDto[];
    }
  }

  return null;
}

export const chatbotService = {
  async recommend(
    request: ChatbotRecommendRequestDto,
  ): Promise<ApiResponse<ChatbotRecommendResponseDto>> {
    return apiClient.post<ChatbotRecommendResponseDto>(
      API_ENDPOINTS.CHATBOT.RECOMMEND,
      request,
    );
  },

  recommendStream(
    request: ChatbotRecommendStreamRequestDto,
    handlers: ChatbotRecommendStreamHandlers,
  ): ChatbotRecommendationStream {
    const eventSource = new EventSource(buildStreamUrl(request));
    let completed = false;

    const close = () => {
      eventSource.close();
    };

    eventSource.addEventListener('reason', (event) => {
      const reason = extractReason((event as MessageEvent<string>).data);

      if (!reason) {
        close();
        handlers.onError(new Error('Received an invalid chatbot reasoning event.'));
        return;
      }

      handlers.onReason(reason);
    });

    eventSource.addEventListener('courses', (event) => {
      const courses = extractCourses((event as MessageEvent<string>).data);

      if (!courses) {
        close();
        handlers.onError(new Error('Received an invalid chatbot courses event.'));
        return;
      }

      completed = true;
      close();
      handlers.onCourses(courses);
    });

    eventSource.onerror = () => {
      if (completed) {
        return;
      }

      const message = eventSource.readyState === EventSource.CLOSED
        ? 'The recommendation stream closed before returning courses.'
        : 'Unable to receive chatbot recommendations.';

      close();
      handlers.onError(new Error(message));
    };

    return { close };
  },
};
