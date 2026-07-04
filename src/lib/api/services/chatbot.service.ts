import type { ChatbotRecommendRequestDto, ChatbotRecommendResponseDto } from '../types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const chatbotService = {
  async recommend(
    request: ChatbotRecommendRequestDto,
  ): Promise<ApiResponse<ChatbotRecommendResponseDto>> {
    return apiClient.post<ChatbotRecommendResponseDto>(
      API_ENDPOINTS.CHATBOT.RECOMMEND,
      request,
    );
  },
};
