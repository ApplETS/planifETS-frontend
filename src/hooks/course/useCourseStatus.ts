import type { CourseStatus } from '@/types/course';
import type { SessionName } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey } from '@/types/session';
import { determineStatus, type TimeInfo } from './courseStatusUtils';

export const useCourseStatus = () => {
  const sessionStore = useSessionStore();

  const getCourseStatus = (
    courseId: number,
    year: number,
    sessionName: SessionName,
    timeInfo: TimeInfo,
  ): CourseStatus => {
    const sessionKey = generateSessionKey(year, sessionName);
    const session = sessionStore.getSessionByKey?.(sessionKey);
    return determineStatus(session, courseId, timeInfo);
  };

  return { getCourseStatus };
};
