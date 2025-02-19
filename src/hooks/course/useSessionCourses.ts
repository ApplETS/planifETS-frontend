import type { Course, CourseInstance, CourseStatus } from '@/types/course';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { useCallback } from 'react';

export const useSessionCourses = () => {
  const sessionStore = useSessionStore();
  const courseStore = useCourseStore();

  const getCourseWithStatus = useCallback(
    (courseId: number, sessionKey: string): (Course & { status: CourseStatus }) | undefined => {
      const course = courseStore.getCourse(courseId);
      const session = sessionStore.getSessionByKey(sessionKey);
      const courseInstance = session?.courseInstances.find((ci: CourseInstance) => ci.courseId === courseId);

      if (!course || !courseInstance) {
        return undefined;
      }

      return {
        ...course,
        status: courseInstance.status,
      };
    },
    [courseStore, sessionStore],
  );

  const getSessionCourses = useCallback(
    (sessionKey: string) => {
      const session = sessionStore.getSessionByKey(sessionKey);
      if (!session) {
        return [];
      }

      return session.courseInstances
        .map(ci => getCourseWithStatus(ci.courseId, sessionKey))
        .filter((course): course is Course & { status: CourseStatus } => !!course);
    },
    [sessionStore, getCourseWithStatus],
  );

  return {
    getCourseWithStatus,
    getSessionCourses,
  };
};
