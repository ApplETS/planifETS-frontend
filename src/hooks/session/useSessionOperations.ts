import type { SessionEnum } from '@/types/session';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { showSuccess } from '@/lib/toast';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { safeGetNumber } from '@/utils/safeAccess';
import { formatSessionShort, generateSessionKey, getSessionTiming } from '@/utils/sessionUtils';

export const useSessionOperations = (year: number, sessionTerm: SessionEnum) => {
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(year, sessionTerm);
  const courseInstances = sessionStore.getSessionCourses(sessionKey);
  const sessionTiming = getSessionTiming(year, sessionTerm);
  const courses = useCourseStore((state) => state.courses);
  const t = useTranslations('PlannerPage');

  const handleAddCourse = (courseId: number) => {
    sessionStore.addCourseToSession(sessionKey, courseId);
  };

  const handleRemoveCourse = (courseId: number) => {
    sessionStore.removeCourseFromSession(sessionKey, courseId);
    const sessionCode = generateSessionKey(year, sessionTerm);
    showSuccess(t('course-removed-from-session', { session: formatSessionShort(sessionCode) }));
  };

  const handleMoveCourse = (toSessionYear: number, toSessionTerm: SessionEnum, courseId: number) => {
    const fromSessionKey = generateSessionKey(year, sessionTerm);
    const toSessionKey = generateSessionKey(toSessionYear, toSessionTerm);

    sessionStore.moveCourse(fromSessionKey, toSessionKey, courseId);
  };

  // Calculate total credits on-demand using fresh course data from the store
  const sessionTotalCredits = useMemo(() => {
    return courseInstances.reduce((total, instance) => {
      const course = safeGetNumber(courses, instance.courseId);
      return total + (course?.credits ?? 0);
    }, 0);
  }, [courseInstances, courses]);

  return {
    courseInstances,
    sessionTiming,
    handleAddCourse,
    handleRemoveCourse,
    handleMoveCourse,
    sessionTotalCredits,
  };
};
