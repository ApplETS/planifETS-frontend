import type { ApiError } from '@/types/api';
import type { Course } from '@/types/course';

import { useCallback, useState } from 'react';

import { courseService } from '@/api/services/course.service';
import { mapApiCourseToAppCourse } from '@/utils/courseUtils';

type UseGlobalCourseSearchReturn = {
  courses: Course[];
  loading: boolean;
  error: ApiError | null;
  isGlobalSearchActive: boolean;
  triggerSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
};

export const useGlobalCourseSearch = (): UseGlobalCourseSearchReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);

  /**
   * Clear global search results and return to local filtering mode
   */
  const clearSearch = useCallback(() => {
    setCourses([]);
    setError(null);
    setIsGlobalSearchActive(false);
    setLoading(false);
  }, []);

  /**
   * Manually trigger a global search across all programs
   * @param query - Search term to query
   */
  const triggerSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setLoading(true);
    setError(null);
    setIsGlobalSearchActive(true);

    try {
      const response = await courseService.searchCourses({
        query: query.trim(),
        // Don't pass programCodes to search all programs
        limit: 100, // Reasonable limit for global search
      });

      if (response.data) {
        // Map API results to app Course type
        const mappedCourses = response.data.courses
          .map((apiCourse) => mapApiCourseToAppCourse(apiCourse))
          .filter((course): course is Course => course !== null);

        setCourses(mappedCourses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError({
        statusCode: null,
        message: 'Failed to search courses. Please try again.',
        raw: err,
      });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [clearSearch]);

  return {
    courses,
    loading,
    error,
    isGlobalSearchActive,
    triggerSearch,
    clearSearch,
  };
};
