import type { ChatbotCourseSuggestionDto } from '@/api/types';
import type { Course } from '@/types/course';

export type RecommendationCardData = {
  code: string;
  reason?: string;
  course?: Course | null;
};

export function buildRecommendationCards(
  courses: ChatbotCourseSuggestionDto[],
  fallbackReason?: string,
): RecommendationCardData[] {
  return courses.map((course) => ({
    code: course.code,
    reason:
      course.reason?.trim() ||
      fallbackReason?.trim() ||
      'Suggested because it matches your request.',
  }));
}
