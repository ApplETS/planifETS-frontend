import type { ApiResponse } from '@/types/api';
import type { Session } from '@/types/session';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const sessionService = {
  async getSessionById(id: string): Promise<ApiResponse<Session>> {
    return apiClient.get<Session>(API_ENDPOINTS.SESSIONS.BY_ID(id));
  },
};
