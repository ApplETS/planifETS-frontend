'use client';

import { useEffect } from 'react';
import { programService } from '../services/program.service';
import { useApi } from './useApi';

/**
 * Hook for fetching all programs
 * Automatically fetches programs on mount
 * @returns Object with programs data, loading, error states and execute function
 *
 * @example
 * const { data: programs, loading, error } = useProgramsApi();
 */
export function useProgramsApi() {
  const result = useApi(() => programService.getPrograms());

  useEffect(() => {
    result.execute();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
}
