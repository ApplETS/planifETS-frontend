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
    (year: number, sessionName: SessionName, operation: string) => {
      const sessionTiming = getSessionTiming(year, sessionName);
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
    (year: number, sessionName: SessionName, course: Course | number) => {
      if (!validateSessionOperation(year, sessionName, 'add')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;

      // Ensure course exists in courseStore if Course object is provided
      if (typeof course !== 'number' && !courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(year, sessionName);
      sessionStore.addCourseToSession(sessionKey, courseId);
    },
    [validateSessionOperation, sessionStore, courseStore],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromYear: number,
      fromSession: SessionName,
      toYear: number,
      toSession: SessionName,
      course: Course | number,
    ) => {
      if (!validateSessionOperation(toYear, toSession, 'move')) {
        return;
      }

      const courseId = typeof course === 'number' ? course : course.id;
      const fromSessionKey = generateSessionKey(fromYear, fromSession);
      const toSessionKey = generateSessionKey(toYear, toSession);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
    },
    [validateSessionOperation, sessionStore],
  );

  const removeCourseFromSession = useCallback(
    (year: number, sessionName: SessionName, courseId: number) => {
      if (!validateSessionOperation(year, sessionName, 'remove')) {
        return;
      }

      const sessionKey = generateSessionKey(year, sessionName);
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
