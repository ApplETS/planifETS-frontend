import type {
  CourseSearchParams,
  DetailedProgramCourseDto,
  SearchCoursesDto,
} from '../types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

type Course = {
  id: string;
  code: string;
  title: string;
  description?: string;
  credits: number;
  prerequisites?: string[];
};

type GetDetailedProgramCourseParams = {
  courseId: number;
  programId: number;
};

export const courseService = {
  /**
   * Search courses by query string
   * @param params - Search parameters including query, programCodes, limit, and offset
   * @returns Paginated search results with courses, total count, and hasMore flag
   */
  async searchCourses(params: CourseSearchParams): Promise<ApiResponse<SearchCoursesDto>> {
    const queryParams = new URLSearchParams();

    queryParams.append('query', params.query);

    // programCodes is optional - only add if provided and not empty
    if (params.programCodes && params.programCodes.trim()) {
      queryParams.append('programCodes', params.programCodes.trim());
    }

    if (params.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }

    if (params.offset !== undefined) {
      queryParams.append('offset', params.offset.toString());
    }

    return apiClient.get<SearchCoursesDto>(
      `${API_ENDPOINTS.COURSES.SEARCH}?${queryParams.toString()}`,
    );
  },

  async getCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(API_ENDPOINTS.COURSES.SEARCH);
  },

  async getDetailedProgramCourse(
    params: GetDetailedProgramCourseParams,
  ): Promise<ApiResponse<DetailedProgramCourseDto>> {
    const queryParams = new URLSearchParams({
      courseId: params.courseId.toString(),
      programId: params.programId.toString(),
    });

    return apiClient.get<DetailedProgramCourseDto>(
      `${API_ENDPOINTS.PROGRAM_COURSES.COURSE_DETAILS}?${queryParams.toString()}`,
    );
  },
};
