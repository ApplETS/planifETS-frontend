import type { SessionName } from '@/types/session';
import { getSessionTiming } from '@/context/planner/utils/sessionUtils';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useSessionValidation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const validateSessionOperation = useCallback(
    (year: number, sessionName: SessionName, operation: string): boolean => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar(`Cannot ${operation} courses in past sessions`, { variant: 'error' });
        return false;
      }

      return true;
    },
    [enqueueSnackbar],
  );

  return { validateSessionOperation };
};
