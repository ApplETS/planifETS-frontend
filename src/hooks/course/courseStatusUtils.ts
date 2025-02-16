import type { TimeInfo } from '@/context/planner/types/TimeInfo';
import type { CourseStatus } from '@/types/course';
import type { Session } from '@/types/session';
import { determineInitialStatus } from '@/utils/courseUtils';

export const determineStatus = (
  session: Session | undefined,
  courseId: number,
  timeInfo: TimeInfo,
): CourseStatus => {
  const courseInstance = session?.courseInstances.find(
    instance => instance.courseId === courseId,
  );

  if (courseInstance?.status) {
    return courseInstance.status;
  }

  return determineInitialStatus(timeInfo);
};
