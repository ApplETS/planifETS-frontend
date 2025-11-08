import type { SessionDto } from '../types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const sessionService = {
  async getLatestAvailableSession(): Promise<ApiResponse<SessionDto>> {
    return apiClient.get<SessionDto>(API_ENDPOINTS.SESSIONS.LATEST_AVAILABLE());
  },
};
