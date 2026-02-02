import type { CourseSearchParams, SearchCoursesDto } from '../../lib/api/types';
import { useState } from 'react';
import { showError } from '@/lib/toast';
import { courseService } from '../../lib/api/services';
import { handleApiError } from '../../lib/api/utils/error-handler';

export function useCourseSearchApi() {
  const [data, setData] = useState<SearchCoursesDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: CourseSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await courseService.searchCourses(params);
      setData(response.data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setData(null);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    search,
    reset,
  };
}
