'use client';

import type { CourseSearchParams, SearchCoursesDto } from '../types';
import type { ApiResponse } from '@/types/api';
import { useCallback, useState } from 'react';
import { courseService } from '../services';
import { handleApiError } from '../utils/error-handler';

type UseCourseSearchState = {
  data: SearchCoursesDto | null;
  loading: boolean;
  error: string | null;
};

type UseCourseSearchReturn = UseCourseSearchState & {
  search: (params: CourseSearchParams) => Promise<ApiResponse<SearchCoursesDto> | null>;
  reset: () => void;
};

/**
 * Hook for searching courses
 * @returns Object with data, loading, error states and search function
 *
 * @example
 * const { data, loading, error, search } = useCourseSearch();
 *
 * const handleSearch = async () => {
 *   await search({
 *     query: 'LOG',
 *     programCodes: '7084;1822',
 *     limit: 20,
 *     offset: 0
 *   });
 * };
 */
export function useCourseSearch(): UseCourseSearchReturn {
  const [state, setState] = useState<UseCourseSearchState>({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(async (params: CourseSearchParams) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await courseService.searchCourses(params);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState({ data: null, loading: false, error: errorMessage });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    search,
    reset,
  };
}
