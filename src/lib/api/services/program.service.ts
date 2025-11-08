import type { ProgramCourseDto, ProgramDto } from '../types/program';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const programService = {
  async getPrograms(): Promise<ApiResponse<ProgramDto[]>> {
    return apiClient.get<ProgramDto[]>(API_ENDPOINTS.PROGRAMS.LIST);
  },

  async getProgramById(id: string): Promise<ApiResponse<ProgramDto>> {
    return apiClient.get<ProgramDto>(API_ENDPOINTS.PROGRAMS.BY_ID(id));
  },

  async getProgramCourses(programId: string): Promise<ApiResponse<ProgramCourseDto[]>> {
    return apiClient.get<ProgramCourseDto[]>(API_ENDPOINTS.PROGRAMS.COURSES(programId));
  },
};
