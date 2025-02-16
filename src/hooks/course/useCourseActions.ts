import type { Course } from '@/types/course';
import type { SessionName } from '@/types/session';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/utils/sessionUtils';
import { useCallback } from 'react';
import { useCourseOperations } from './useCourseOperations';

export const useCourseActions = () => {
  const sessionStore = useSessionStore();
  const courseStore = useCourseStore();
  const { validateSessionOperation } = useCourseOperations();

  const addCourseToSession = useCallback(
    (year: number, sessionName: SessionName, course: Course) => {
      if (!validateSessionOperation(year, sessionName, 'add')) {
        return;
      }

      if (!courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      const sessionKey = generateSessionKey(year, sessionName);
      sessionStore.addCourseToSession(sessionKey, course.id);
    },
    [sessionStore, courseStore, validateSessionOperation],
  );

  const removeCourseFromSession = useCallback(
    (year: number, sessionName: SessionName, course: Course) => {
      if (!validateSessionOperation(year, sessionName, 'remove')) {
        return;
      }

      const sessionKey = generateSessionKey(year, sessionName);
      sessionStore.removeCourseFromSession(sessionKey, course.id);
    },
    [sessionStore, validateSessionOperation],
  );

  return {
    addCourseToSession,
    removeCourseFromSession,
  };
};
