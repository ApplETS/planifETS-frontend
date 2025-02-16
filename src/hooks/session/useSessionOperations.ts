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
  const courseInstances = sessionStore.getSessionCourses(sessionKey);
  const timeInfo = getSessionTiming(year, sessionName);

  const handleOperation = (operation: string, callback: () => void) => {
    const error = validateSessionOperation(timeInfo, operation);
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      return;
    }
    callback();
  };

  const handleAddCourse = (courseId: number) => {
    // eslint-disable-next-line no-console
    console.log('handleAddCourse called with:', courseId);
    handleOperation('add', () => {
      // eslint-disable-next-line no-console
      console.log('Adding course to session:', sessionKey, courseId);
      sessionStore.addCourseToSession(sessionKey, courseId);
    });
  };

  const handleRemoveCourse = (courseId: number) => {
    handleOperation('remove', () => {
      sessionStore.removeCourseFromSession(sessionKey, courseId);
    });
  };

  const handleMoveCourse = (toYear: number, toSession: SessionName, courseId: number) => {
    handleOperation('move', () => {
      const toSessionKey = generateSessionKey(toYear, toSession);
      sessionStore.moveCourse(sessionKey, toSessionKey, courseId);
    });
  };

  return {
    courseInstances,
    timing: timeInfo,
    handleAddCourse,
    handleRemoveCourse,
    handleMoveCourse,
  };
};
