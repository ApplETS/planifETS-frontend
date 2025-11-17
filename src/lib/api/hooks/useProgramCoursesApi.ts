'use client';

import type { ProgramCoursesResponseDto } from '../types/program';
import type { ApiError } from '@/types/api';
import { useEffect, useRef, useState } from 'react';
import { programService } from '../services/program.service';

/**
 * Hook for fetching program courses by program IDs
 * @param programIds Array of program IDs
 * @returns Object with data, loading, error states
 */
export function useProgramCoursesApi(programIds: string[]) {
  const [data, setData] = useState<ProgramCoursesResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousProgramIds = useRef<string>('');

  useEffect(() => {
    const currentProgramIds = programIds.join(',');

    // Skip if no programs or same as previous fetch
    if (programIds.length === 0 || currentProgramIds === previousProgramIds.current) {
      return;
    }

    previousProgramIds.current = currentProgramIds;

    const fetchProgramCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await programService.getProgramCourses(programIds);
        setData(response.data);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramCourses();
  }, [programIds]);

  return { data, loading, error };
}
