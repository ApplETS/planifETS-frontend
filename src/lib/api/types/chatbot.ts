export type ChatbotRecommendRequestDto = {
  prompt: string;
  programIds?: number[];
};

export type ChatbotRecommendStreamRequestDto = {
  prompt: string;
  programIds?: number[];
};

export type ChatbotCourseSuggestionDto = {
  code: string;
  reason?: string;
};

export type ChatbotStreamStatus = 'SEARCHING_EMBEDDINGS' | 'THINKING_AI';

export type ChatbotRecommendResponseDto = {
  courses: ChatbotCourseSuggestionDto[];
  explanation: string;
};

export type ChatbotRecommendStreamHandlers = {
  onStatus: (status: ChatbotStreamStatus) => void;
  onReason: (reason: string) => void;
  onCourses: (courses: ChatbotCourseSuggestionDto[]) => void;
  onError: (error: Error) => void;
};

export type ChatbotRecommendationStream = {
  close: () => void;
};
