'use client';

import { useEffect, useRef } from 'react';
import { useApi } from '../../lib/api/hooks/useApi';
import { programService } from '../../lib/api/services/program.service';

/**
 * Hook for fetching program courses by program IDs
 * @param programIds Array of program IDs
 * @returns Object with data, loading, error states
 */
export function useProgramCoursesApi(programIds: number[]) {
  const previousProgramIds = useRef<string>('');
  const { data, loading, error, execute, reset } = useApi(() => programService.getProgramCourses(programIds));

  useEffect(() => {
    const currentProgramIds = programIds.join(',');
    if (programIds.length === 0 || currentProgramIds === previousProgramIds.current) {
      return;
    }
    previousProgramIds.current = currentProgramIds;
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programIds]);

  return { data, loading, error, reset };
}
