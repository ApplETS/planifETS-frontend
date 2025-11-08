/**
 * Course Service
 * Handles course-related API calls
 */

import type { ApiResponse } from '@/types/api';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export type Course = {
  id: string;
  code: string;
  title: string;
  description?: string;
  credits: number;
  prerequisites?: string[];
  corequisites?: string[];
};

export type CourseSearchParams = {
  query?: string;
  programId?: string;
  credits?: number;
};

export const courseService = {
  /**
   * Get all courses
   */
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(API_ENDPOINTS.COURSES.LIST);
  },

  /**
   * Get course by ID
   */
  async getCourseById(id: string): Promise<ApiResponse<Course>> {
    return apiClient.get<Course>(API_ENDPOINTS.COURSES.BY_ID(id));
  },

  /**
   * Get course prerequisites
   */
  async getCoursePrerequisites(courseId: string): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(API_ENDPOINTS.COURSES.PREREQUISITES(courseId));
  },
};
