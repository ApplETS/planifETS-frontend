import type { Course, CourseInstance, CourseStatus } from '@/types/course';
import { useCallback } from 'react';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { safeGet, safeGetNumber } from '@/utils/safeAccess';

export const useSessionCourses = () => {
  const courses = useCourseStore((state) => state.courses);
  const sessions = useSessionStore((state) => state.sessions);

  const getCourseWithStatus = useCallback(
    (courseId: number, sessionKey: string): (Course & { status: CourseStatus }) | undefined => {
      const course = safeGetNumber(courses, courseId);
      const session = safeGet(sessions, sessionKey);
      const courseInstance = session?.courseInstances.find((ci: CourseInstance) => ci.courseId === courseId);

      if (!course || !courseInstance) {
        return undefined;
      }

      return {
        ...course,
        status: courseInstance.status,
      };
    },
    [courses, sessions],
  );

  const getSessionCourses = useCallback(
    (sessionKey: string) => {
      const session = safeGet(sessions, sessionKey);
      if (!session) {
        return [];
      }

      return session.courseInstances
        .map((ci) => getCourseWithStatus(ci.courseId, sessionKey))
        .filter((course): course is Course & { status: CourseStatus } => !!course);
    },
    [sessions, getCourseWithStatus],
  );

  return {
    getCourseWithStatus,
    getSessionCourses,
  };
};
