'use client';

import type { ProgramDto } from '../types/program';
import type { ApiError } from '@/types/api';
import { useEffect, useRef, useState } from 'react';
import { programService } from '../services/program.service';

/**
 * Hook for fetching all programs
 * Automatically fetches programs on mount
 * @returns Object with programs data, loading, error states
 *
 * @example
 * const { data: programs, loading, error } = useProgramsApi();
 */
export function useProgramsApi() {
  const [data, setData] = useState<ProgramDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await programService.getPrograms();
        setData(response.data);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return { data, loading, error };
}
