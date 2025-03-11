import type { CourseStatus } from '@/types/course';
import type { SessionEnum, SessionTiming } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/utils/sessionUtils';
import { determineStatus } from './courseStatusUtils';

export const useCourseStatus = () => {
  const sessionStore = useSessionStore();

  const getCourseStatus = (
    courseId: number,
    sessionYear: number,
    sessionTerm: SessionEnum,
    sessionTiming: SessionTiming,
  ): CourseStatus => {
    const sessionKey = generateSessionKey(sessionYear, sessionTerm);
    const session = sessionStore.getSessionByKey?.(sessionKey);
    return determineStatus(session, courseId, sessionTiming);
  };

  return { getCourseStatus };
};
