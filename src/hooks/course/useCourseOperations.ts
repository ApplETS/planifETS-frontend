import type { Course } from '@/types/course';
import type { SessionName } from '@/types/session';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey, getSessionTiming, validateSessionOperation as validateSession } from '@/utils/sessionUtils';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useCourseOperations = () => {
  const { enqueueSnackbar } = useSnackbar();
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();

  const validateSessionOperation = useCallback(
    (sessionYear: number, sessionName: SessionName, operation: string) => {
      const sessionTiming = getSessionTiming(sessionYear, sessionName);
      const error = validateSession(sessionTiming, operation);
      if (error) {
        enqueueSnackbar(error, { variant: 'error' });
        return false;
      }
      return true;
    },
    [enqueueSnackbar],
  );

  const addCourseToSession = useCallback(
    (sessionYear: number, sessionName: SessionName, course: Course | number) => {
      if (!validateSessionOperation(sessionYear, sessionName, 'add')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;

      // Ensure course exists in courseStore if Course object is provided
      if (typeof course !== 'number' && !courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(sessionYear, sessionName);
      sessionStore.addCourseToSession(sessionKey, courseId);
    },
    [validateSessionOperation, sessionStore, courseStore],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromSessionYear: number,
      fromSessionName: SessionName,
      toSessionYear: number,
      toSessionName: SessionName,
      course: Course | number,
    ) => {
      if (!validateSessionOperation(toSessionYear, toSessionName, 'move')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;
      const fromSessionKey = generateSessionKey(fromSessionYear, fromSessionName);
      const toSessionKey = generateSessionKey(toSessionYear, toSessionName);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
    },
    [validateSessionOperation, sessionStore],
  );

  const removeCourseFromSession = useCallback(
    (sessionYear: number, sessionName: SessionName, courseId: number) => {
      if (!validateSessionOperation(sessionYear, sessionName, 'remove')) {
        return;
      }

      const sessionKey = generateSessionKey(sessionYear, sessionName);
      sessionStore.removeCourseFromSession(sessionKey, courseId);
    },
    [validateSessionOperation, sessionStore],
  );

  const getCourseInstances = useCallback((sessionKey: string) => {
    return sessionStore.getSessionCourses(sessionKey);
  }, [sessionStore]);

  return {
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
    getCourseInstances,
    validateSessionOperation,
  };
};
