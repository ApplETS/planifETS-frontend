'use client';

import type { ApiResponse } from '@/types/api';
import { useCallback, useState } from 'react';
import { handleApiError } from '../utils/error-handler';

type UseApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseApiReturn<T> = UseApiState<T> & {
  execute: () => Promise<ApiResponse<T> | null>;
  reset: () => void;
};

/**
 * Hook for managing API call state (read-only operations)
 * @param apiFunction - The API function to call
 * @returns Object with data, loading, error states and execute function
 *
 * @example
 * const { data, loading, error, execute } = useApi(() => programService.getPrograms());
 *
 * useEffect(() => {
 *   execute();
 * }, [execute]);
 */
export function useApi<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction();
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setState({ data: null, loading: false, error: errorMessage });
      return null;
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
