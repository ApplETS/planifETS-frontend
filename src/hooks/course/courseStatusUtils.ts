import type { CourseStatus } from '@/types/course';
import type { Session, SessionTiming } from '@/types/session';
import { determineInitialStatus } from '@/utils/courseUtils';

export const determineStatus = (
  session: Session | undefined,
  courseId: number,
  sessionTiming: SessionTiming,
): CourseStatus => {
  const courseInstance = session?.courseInstances.find(
    (instance) => instance.courseId === courseId,
  );

  if (courseInstance?.status) {
    return courseInstance.status;
  }

  return determineInitialStatus(sessionTiming);
};
