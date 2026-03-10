'use client';

import { useEffect } from 'react';
import { programService } from '../services/program.service';
import { useApi } from './useApi';

/**
 * Hook for fetching all programs
 * Automatically fetches programs on mount
 * @returns Object with programs data, loading, error states
 *
 * @example
 * const { data: programs, loading, error } = useProgramsApi();
 */

export function useProgramsApi() {
  const { data, loading, error, execute, reset } = useApi(() => programService.getPrograms());

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, reset };
}
