import type { CourseSearchParams, SearchCoursesDto } from '../types';
import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export type Availability = 'JOUR' | 'SOIR';
export type Trimester = 'HIVER' | 'ETE' | 'AUTOMNE';

export type Session = {
  trimester: Trimester;
  year: number;
};

export type CourseInstance = {
  availability: Availability[];
  sessionYear: number;
  sessionTrimester: Trimester;
  session: Session;
};

export type CourseDetail = {
  code: string;
  title: string;
  credits: number;
  description: string;
  cycle: number;
  courseInstances: CourseInstance[];
};

export type ProgramCourse = {
  courseId: number;
  programId: number;
  type: string;
  typicalSessionIndex: number;
  unstructuredPrerequisite: string;
  course: CourseDetail;
  prerequisites: unknown[];
};

export type Course = {
  id: string;
  code: string;
  title: string;
  description?: string;
  credits: number;
  prerequisites?: string[];
  corequisites?: string[];
};

export type GetCourseParams = {
  courseId: number;
  programCode: string;
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

  async getCourse(params: GetCourseParams): Promise<ApiResponse<ProgramCourse>> {
    const queryParams = new URLSearchParams({
      courseId: params.courseId.toString(),
      programCode: params.programCode,
    });
    return apiClient.get<ProgramCourse>(
      `${API_ENDPOINTS.PROGRAM_COURSES.COURSE_DETAILS}?${queryParams.toString()}`,
    );
  },
};
