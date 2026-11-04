import type { ResolvedRecommendationCardData } from './recommendations';

export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
  isStreaming?: boolean;
  interrupted?: boolean;
  durationMs?: number;
  model?: string;
  error?: string;
  suggestedCourses?: ResolvedRecommendationCardData[];
};
