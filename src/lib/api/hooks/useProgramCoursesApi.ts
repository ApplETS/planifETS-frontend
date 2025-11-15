'use client';

import { useEffect } from 'react';
import { programService } from '../services/program.service';
import { useApi } from './useApi';

/**
 * Hook for fetching program courses by program codes
 * Automatically fetches courses when programCodes change
 * @param programIds - Array of program codes to fetch courses for
 * @returns Object with program courses data, loading, error states and execute function
 *
 * @example
 * const { data, loading, error } = useProgramCoursesApi(['7625', '7365']);
 */
export function useProgramCoursesApi(programIds: string[]) {
  const result = useApi(() => programService.getProgramCourses(programIds));

  useEffect(() => {
    if (programIds.length > 0) {
      result.execute();
    }
  }, [programIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
}
