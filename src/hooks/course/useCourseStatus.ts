import type { CourseStatus } from '@/types/course';
import type { SessionEnum, SessionTiming } from '@/types/session';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { determineStatus } from '@/utils/courseUtils';
import { generateSessionKey, isCourseAvailableInSession } from '@/utils/sessionUtils';

export const useCourseStatus = () => {
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();

  const getCourseStatus = (
    courseId: number,
    sessionYear: number,
    sessionTerm: SessionEnum,
    sessionTiming: SessionTiming,
  ): CourseStatus => {
    const sessionKey = generateSessionKey(sessionYear, sessionTerm);
    const session = sessionStore.getSessionByKey?.(sessionKey);
    const isAvailable = isCourseAvailableInSession(
      courseId,
      sessionTerm,
      sessionYear,
      courseStore.getCourse,
    );
    return determineStatus({
      sessionTiming,
      isKnownAvailability: session?.isKnownSessionAvailability === true,
      isCourseAvailable: isAvailable,
    });
  };

  return { getCourseStatus };
};
