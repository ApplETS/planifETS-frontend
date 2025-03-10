import type { SessionName } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';
import {
  generateSessionKey,
  getSessionTiming,
  validateSessionOperation,
} from '@/utils/sessionUtils';
import { useSnackbar } from 'notistack';

export const useSessionOperations = (year: number, sessionName: SessionName) => {
  const { enqueueSnackbar } = useSnackbar();
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(year, sessionName);
  const session = sessionStore.getSessionByKey(sessionKey);
  const courseInstances = sessionStore.getSessionCourses(sessionKey);
  const sessionTiming = getSessionTiming(year, sessionName);

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

  const handleMoveCourse = (toSessionYear: number, toSessionName: SessionName, courseId: number) => {
    handleOperation('move', () => {
      const fromSessionKey = generateSessionKey(year, sessionName);
      const toSessionKey = generateSessionKey(toSessionYear, toSessionName);

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
