import type { Course } from '@/types/course';
import type { SessionName } from '@/types/session';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/types/session';
import { useCallback } from 'react';
import { useSessionValidation } from './useSessionValidation';

export const useCourseActions = () => {
  const sessionStore = useSessionStore();
  const courseStore = useCourseStore();
  const { validateSessionOperation } = useSessionValidation();

  const addCourseToSession = useCallback(
    (year: number, sessionName: SessionName, course: Course) => {
      if (!validateSessionOperation(year, sessionName, 'add')) {
        return;
      }

      if (!courseStore.getCourse(course.id)) {
        courseStore.addCourse(course);
      }

      sessionStore.addCourseToSession(year, sessionName, course.id);
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
