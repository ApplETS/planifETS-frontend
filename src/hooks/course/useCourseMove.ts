import type { SessionName } from '@/types/session';
import { getSessionTiming } from '@/context/planner/utils/sessionUtils';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/types/session';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

/**
 * Hook for managing course movement logic between sessions
 * Handles course status updates and validation
 * @returns {object} Course movement handlers and utility functions
 */
export const useCourseMove = () => {
  const { enqueueSnackbar } = useSnackbar();
  const sessionStore = useSessionStore();

  const moveCourseBetweenSessions = useCallback(
    (
      fromYear: number,
      fromSession: SessionName,
      toYear: number,
      toSession: SessionName,
      courseId: number,
    ) => {
      const timing = getSessionTiming(toYear, toSession);

      if (timing.isPast) {
        enqueueSnackbar('Cannot move courses to past sessions', { variant: 'error' });
        return;
      }

      const fromSessionKey = generateSessionKey(fromYear, fromSession);
      const toSessionKey = generateSessionKey(toYear, toSession);

      sessionStore.moveCourseBetweenSessions(fromSessionKey, toSessionKey, courseId);
    },
    [enqueueSnackbar, sessionStore],
  );

  const addCourseToSession = useCallback(
    (year: number, sessionName: SessionName, courseId: number) => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar('Cannot add courses to past sessions', { variant: 'error' });
        return;
      }

      sessionStore.addCourseToSession(year, sessionName, courseId);
    },
    [enqueueSnackbar, sessionStore],
  );

  const removeCourseFromSession = useCallback(
    (year: number, sessionName: SessionName, courseId: number) => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar('Cannot remove courses from past sessions', { variant: 'error' });
        return;
      }

      const sessionKey = generateSessionKey(year, sessionName);
      sessionStore.removeCourseFromSession(sessionKey, courseId);
    },
    [enqueueSnackbar, sessionStore],
  );

  return {
    moveCourseBetweenSessions,
    addCourseToSession,
    removeCourseFromSession,
  };
};
