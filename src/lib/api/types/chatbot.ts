export type ChatbotRecommendStreamRequestDto = {
  prompt: string;
  programIds?: number[];
};

export type ChatbotCourseSuggestionDto = {
  code: string;
  reason?: string;
};

export type ChatbotStreamStatus = 'SEARCHING_EMBEDDINGS' | 'THINKING_AI';

export type ChatbotRecommendStreamHandlers = {
  onStatus: (status: ChatbotStreamStatus) => void;
  onReason: (reason: string) => void;
  onModel?: (model: string) => void;
  onCourses: (courses: ChatbotCourseSuggestionDto[]) => void;
  onError: (error: Error) => void;
};

export type ChatbotRecommendationStream = {
  close: () => void;
};
