import type { SessionDto } from '@/api/types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

export const sessionService = {
  async getLatestAvailableSession(): Promise<ApiResponse<SessionDto>> {
    return apiClient.get<SessionDto>(API_ENDPOINTS.SESSIONS.LATEST_AVAILABLE());
  },
};
