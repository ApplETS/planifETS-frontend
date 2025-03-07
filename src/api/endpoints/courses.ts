import type {
  ApiResponse,
  CourseDetail,
  CourseInstructor,
  CourseSchedule,
} from '../types';
import { apiRequest } from '../client';
import { API_CONFIG } from '../config';

/**
 * Fetches detailed information about a specific course
 * @param courseId - The unique identifier of the course
 * @returns Promise with course details
 */
export async function getCourseDetails(courseId: number): Promise<CourseDetail> {
  const endpoint = API_CONFIG.endpoints.courses.getDetails;
  const response = await apiRequest<ApiResponse<CourseDetail>>(endpoint, {
    pathParams: { id: courseId },
  });

  return response.data;
}

/**
 * Fetches schedule information for a specific course
 * @param courseId - The unique identifier of the course
 * @returns Promise with course schedule data
 */
export async function getCourseSchedule(courseId: number): Promise<CourseSchedule[]> {
  const endpoint = API_CONFIG.endpoints.courses.getSchedule;
  const response = await apiRequest<ApiResponse<CourseSchedule[]>>(endpoint, {
    pathParams: { id: courseId },
  });

  return response.data;
}

/**
 * Fetches information about instructors for a specific course
 * @param courseId - The unique identifier of the course
 * @returns Promise with course instructor data
 */
export async function getCourseInstructors(
  courseId: number,
): Promise<CourseInstructor[]> {
  const endpoint = API_CONFIG.endpoints.courses.getInstructors;
  const response = await apiRequest<ApiResponse<CourseInstructor[]>>(endpoint, {
    pathParams: { id: courseId },
  });

  return response.data;
}

/**
 * Updates a user's status for a course (favorite, completed, etc)
 * @param courseId - The unique identifier of the course
 * @param status - The new status to apply
 */
export async function updateCourseStatus(
  courseId: number,
  status: string,
): Promise<void> {
  const endpoint = API_CONFIG.endpoints.courses.updateStatus;
  await apiRequest(endpoint, {
    method: 'POST',
    body: { courseId, status },
  });
}
