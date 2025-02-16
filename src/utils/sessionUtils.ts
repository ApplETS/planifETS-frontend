import type { CourseInstance } from '@/types/course';
import type { Session, SessionName } from '@/types/session';
import { useCourseStore } from '@/store/courseStore';

export const SESSION_NAMES: SessionName[] = ['Automne', 'Hiver', 'Été'];

export const calculateTotalCredits = (courseInstances: CourseInstance[]): number => {
  return courseInstances.reduce((total, instance) => {
    const course = useCourseStore.getState().getCourse(instance.courseId);
    return total + (course?.credits || 0);
  }, 0);
};

export const createSessionsForYear = (year: number): Record<string, Session> => {
  const sessions: Record<string, Session> = {};

  SESSION_NAMES.forEach((name) => {
    const key = `${year}-${name}`;
    sessions[key] = {
      key,
      name,
      year,
      courseInstances: [],
      totalCredits: 0,
    };
  });

  return sessions;
};

export const parseSessionKey = (sessionKey: string): { year: string; sessionName: string } | null => {
  const [year, sessionName] = sessionKey.split('-');
  if (!year || !sessionName) {
    return null;
  }
  return { year, sessionName };
};

export const validateSessionOperation = (timing: { isPast: boolean }, operation: string): string | null => {
  if (timing.isPast) {
    return `Cannot ${operation} courses in past sessions`;
  }
  return null;
};

export const updateSessionWithCourses = (
  session: Session,
  courseInstances: CourseInstance[],
): Session => {
  return {
    ...session,
    courseInstances,
    totalCredits: calculateTotalCredits(courseInstances),
  };
};
