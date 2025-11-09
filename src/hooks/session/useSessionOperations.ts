import type { SessionEnum } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';
import {
  generateSessionKey,
  getSessionTiming,
} from '@/utils/sessionUtils';

export const useSessionOperations = (year: number, sessionTerm: SessionEnum) => {
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(year, sessionTerm);
  const session = sessionStore.getSessionByKey(sessionKey);
  const courseInstances = sessionStore.getSessionCourses(sessionKey);
  const sessionTiming = getSessionTiming(year, sessionTerm);

  const handleAddCourse = (courseId: number) => {
    sessionStore.addCourseToSession(sessionKey, courseId);
  };

  const handleRemoveCourse = (courseId: number) => {
    sessionStore.removeCourseFromSession(sessionKey, courseId);
  };

  const handleMoveCourse = (toSessionYear: number, toSessionTerm: SessionEnum, courseId: number) => {
    const fromSessionKey = generateSessionKey(year, sessionTerm);
    const toSessionKey = generateSessionKey(toSessionYear, toSessionTerm);

    sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
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
