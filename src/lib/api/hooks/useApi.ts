'use client';

import type { ApiResponse } from '@/types/api';
import { useCallback, useState } from 'react';
import { monitoring } from '@/lib/monitoring';
import { showError } from '@/lib/toast';
import { ApiErrorHandler, ApiNetworkError, handleApiError } from '../utils/error-handler';

type UseApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
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
    isOffline: false,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction();
      setState({ data: response.data, loading: false, error: null, isOffline: false });
      return response;
    } catch (err) {
      const isOffline = ApiErrorHandler.isNetworkError(err);
      const errorMessage = handleApiError(err);

      const error = err instanceof Error ? err : new Error(errorMessage);
      const url = err instanceof ApiNetworkError ? err.url : undefined;
      monitoring.captureException(error, { api: { isOffline, url } });

      showError(errorMessage);
      setState({ data: null, loading: false, error: errorMessage, isOffline });
      return null;
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null, isOffline: false });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
