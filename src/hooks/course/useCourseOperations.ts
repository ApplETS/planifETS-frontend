import type { Course } from '@/types/course';
import type { SessionEnum } from '@/types/session';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey, getSessionTiming, validateSessionOperation as validateSession } from '@/utils/sessionUtils';

export const useCourseOperations = () => {
  const { enqueueSnackbar } = useSnackbar();
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();

  const validateSessionOperation = useCallback(
    (sessionYear: number, sessionTerm: SessionEnum, operation: string) => {
      const sessionTiming = getSessionTiming(sessionYear, sessionTerm);
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
    (sessionYear: number, sessionTerm: SessionEnum, course: Course | number) => {
      if (!validateSessionOperation(sessionYear, sessionTerm, 'add')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;

      // Ensure course exists in courseStore if Course object is provided
      if (typeof course !== 'number' && !courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(sessionYear, sessionTerm);
      sessionStore.addCourseToSession(sessionKey, courseId);
    },
    [validateSessionOperation, sessionStore, courseStore],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromSessionYear: number,
      fromSessionTerm: SessionEnum,
      toSessionYear: number,
      toSessionTerm: SessionEnum,
      course: Course | number,
    ) => {
      if (!validateSessionOperation(toSessionYear, toSessionTerm, 'move')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;
      const fromSessionKey = generateSessionKey(fromSessionYear, fromSessionTerm);
      const toSessionKey = generateSessionKey(toSessionYear, toSessionTerm);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
    },
    [validateSessionOperation, sessionStore],
  );

  const removeCourseFromSession = useCallback(
    (sessionYear: number, sessionTerm: SessionEnum, courseId: number) => {
      if (!validateSessionOperation(sessionYear, sessionTerm, 'remove')) {
        return;
      }

      const sessionKey = generateSessionKey(sessionYear, sessionTerm);
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
