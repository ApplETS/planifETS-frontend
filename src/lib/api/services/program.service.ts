import type { ProgramCoursesResponseDto, ProgramDto } from '../types/program';
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

  async getProgramCourses(programIds: string[]): Promise<
    ApiResponse<ProgramCoursesResponseDto>
  > {
    const params = new URLSearchParams();
    for (const code of programIds) {
      params.append('programIds', code);
    }

    return apiClient.get<ProgramCoursesResponseDto>(
      `${API_ENDPOINTS.PROGRAM_COURSES.DEFAULT}?${params.toString()}`,
    );
  },
};
