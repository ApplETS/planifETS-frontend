import type { TimeInfo } from '@/context/planner/types/TimeInfo';
import type { CourseStatus } from '@/types/course';
import type { Session } from '@/types/session';

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

  if (timeInfo.isCurrentSession) {
    return 'In Progress';
  }

  if (timeInfo.isPastSession) {
    return 'Completed';
  }

  return 'Planned';
};
