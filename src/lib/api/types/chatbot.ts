export type ChatbotRecommendRequestDto = {
  prompt: string;
};

export type ChatbotRecommendStreamRequestDto = {
  prompt: string;
  programIds?: number[];
};

export type ChatbotCourseSuggestionDto = {
  code: string;
  reason?: string;
};

export type ChatbotRecommendResponseDto = {
  courses: ChatbotCourseSuggestionDto[];
  explanation: string;
};

export type ChatbotRecommendStreamHandlers = {
  onReason: (reason: string) => void;
  onCourses: (courses: ChatbotCourseSuggestionDto[]) => void;
  onError: (error: Error) => void;
};

export type ChatbotRecommendationStream = {
  close: () => void;
};
