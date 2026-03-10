import type { Course } from '@/types/course';
import type { TermEnum } from '@/types/session';
import { useCallback } from 'react';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/utils/sessionUtils';

export const useCourseOperations = () => {
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();

  const addCourseToSession = useCallback(
    (sessionYear: number, sessionTerm: TermEnum, course: Course | number) => {
      const courseId = typeof course === 'number' ? course : course.id;

      // Ensure course exists in courseStore if Course object is provided
      if (typeof course !== 'number' && !courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(sessionYear, sessionTerm);
      sessionStore.addCourseToSession(sessionKey, courseId);
    },
    [sessionStore, courseStore],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromSessionYear: number,
      fromSessionTerm: TermEnum,
      toSessionYear: number,
      toSessionTerm: TermEnum,
      course: Course | number,
    ) => {
      const courseId = typeof course === 'number' ? course : course.id;
      const fromSessionKey = generateSessionKey(fromSessionYear, fromSessionTerm);
      const toSessionKey = generateSessionKey(toSessionYear, toSessionTerm);

      sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
    },
    [sessionStore],
  );

  const removeCourseFromSession = useCallback(
    (sessionYear: number, sessionTerm: TermEnum, courseId: number) => {
      const sessionKey = generateSessionKey(sessionYear, sessionTerm);
      sessionStore.removeCourseFromSession(sessionKey, courseId);
    },
    [sessionStore],
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
