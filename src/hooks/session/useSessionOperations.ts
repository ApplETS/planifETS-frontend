import type { SessionEnum } from '@/types/session';
import { useSnackbar } from 'notistack';
import { useSessionStore } from '@/store/sessionStore';
import {
  generateSessionKey,
  getSessionTiming,
  validateSessionOperation,
} from '@/utils/sessionUtils';

export const useSessionOperations = (year: number, sessionTerm: SessionEnum) => {
  const { enqueueSnackbar } = useSnackbar();
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(year, sessionTerm);
  const session = sessionStore.getSessionByKey(sessionKey);
  const courseInstances = sessionStore.getSessionCourses(sessionKey);
  const sessionTiming = getSessionTiming(year, sessionTerm);

  const handleOperation = (operation: string, callback: () => void) => {
    const error = validateSessionOperation(sessionTiming, operation);
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      return;
    }
    callback();
  };

  const handleAddCourse = (courseId: number) => {
    handleOperation('add', () => {
      sessionStore.addCourseToSession(sessionKey, courseId);
    });
  };

  const handleRemoveCourse = (courseId: number) => {
    handleOperation('remove', () => {
      sessionStore.removeCourseFromSession(sessionKey, courseId);
    });
  };

  const handleMoveCourse = (toSessionYear: number, toSessionTerm: SessionEnum, courseId: number) => {
    handleOperation('move', () => {
      const fromSessionKey = generateSessionKey(year, sessionTerm);
      const toSessionKey = generateSessionKey(toSessionYear, toSessionTerm);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
    });
  };

  return {
    courseInstances,
    sessionTiming,
    handleAddCourse,
    handleRemoveCourse,
    handleMoveCourse,
    sessionTotalCredits: session?.totalCredits ?? 0,
  };
};
