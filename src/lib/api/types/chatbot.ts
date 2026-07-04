export type ChatbotRecommendRequestDto = {
  prompt: string;
};

export type ChatbotCourseSuggestionDto = {
  code: string;
  reason?: string;
};

export type ChatbotRecommendResponseDto = {
  courses: ChatbotCourseSuggestionDto[];
  explanation: string;
};
