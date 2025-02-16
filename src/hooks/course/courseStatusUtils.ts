import type { CourseStatus } from '@/types/course';
import type { Session } from '@/types/session';

export type TimeInfo = {
  isCurrentSession: boolean;
  isPastSession: boolean;
};

export const determineStatus = (
  session: Session | undefined,
  courseId: number,
  timeInfo: TimeInfo,
): CourseStatus => {
  const courseInstance = session?.courseInstances.find(
    instance => instance.courseId === courseId,
  );

  if (timeInfo.isCurrentSession) {
    return 'In Progress';
  }

  if (timeInfo.isPastSession) {
    return courseInstance?.status === 'Failed' ? 'Failed' : 'Completed';
  }

  return courseInstance?.status || 'Planned';
};
