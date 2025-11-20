import type { ProgramCoursesResponseDto, ProgramDto } from '../types/program';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const programService = {
  async getPrograms(): Promise<ApiResponse<ProgramDto[]>> {
    return apiClient.get<ProgramDto[]>(API_ENDPOINTS.PROGRAMS.LIST);
  },

  async getProgramById(programId: string): Promise<ApiResponse<ProgramDto>> {
    return apiClient.get<ProgramDto>(API_ENDPOINTS.PROGRAMS.BY_ID(programId));
  },

  async getProgramCourses(programIds: number[]): Promise<
    ApiResponse<ProgramCoursesResponseDto>
  > {
    const params = new URLSearchParams();
    for (const id of programIds) {
      params.append('programIds', id.toString());
    }

    return apiClient.get<ProgramCoursesResponseDto>(
      `${API_ENDPOINTS.PROGRAM_COURSES.PROGRAMS}?${params.toString()}`,
    );
  },

  async getCoursesByIds(courseIds: number[]): Promise<
    ApiResponse<ProgramCoursesResponseDto>
  > {
    const params = new URLSearchParams();
    for (const id of courseIds) {
      params.append('courseIds', id.toString());
    }

    return apiClient.get<ProgramCoursesResponseDto>(
      `${API_ENDPOINTS.PROGRAM_COURSES.IDS}?${params.toString()}`,
    );
  },
};
