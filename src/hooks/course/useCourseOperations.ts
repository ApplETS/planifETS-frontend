import type { Course } from '@/types/course';
import type { SessionName } from '@/types/session';
import { getSessionTiming } from '@/context/planner/utils/sessionUtils';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/types/session';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useCourseOperations = () => {
  const { enqueueSnackbar } = useSnackbar();
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();

  const addCourseToSession = useCallback(
    (year: number, sessionName: SessionName, course: Course) => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar('Cannot add courses to past sessions', { variant: 'error' });
        return;
      }

      // Ensure course exists in courseStore
      if (!courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(year, sessionName);
      sessionStore.addCourseToSession(sessionKey, course.id);
    },
    [enqueueSnackbar, sessionStore, courseStore],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromYear: number,
      fromSession: SessionName,
      toYear: number,
      toSession: SessionName,
      course: Course,
    ) => {
      const timing = getSessionTiming(toYear, toSession);

      if (timing.isPast) {
        enqueueSnackbar('Cannot move courses to past sessions', { variant: 'error' });
        return;
      }

      const fromSessionKey = generateSessionKey(fromYear, fromSession);
      const toSessionKey = generateSessionKey(toYear, toSession);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, course.id);
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

  const getCourseInstances = useCallback((sessionKey: string) => {
    return sessionStore.getSessionCourses(sessionKey);
  }, [sessionStore]);

  return {
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
    getCourseInstances,
  };
};
