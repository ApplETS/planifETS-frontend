import type { coursesData } from '@/app/planner/courses-data';
import type { YearData } from '@/types/planner';
import { generateSessionKey } from '@/utils/sessionUtils';

export const convertCoursesToSessions = (data: typeof coursesData): YearData[] => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.sessions.map(yearData => ({
    ...yearData,
    sessions: yearData.sessions.map(session => ({
      ...session,
      key: generateSessionKey(yearData.year, session.name),
      courseInstances: session.courseInstances,
      totalCredits: session.courseInstances.reduce((total, ci) => {
        const course = data.courses.find(c => c.id === ci.courseId);
        return total + (course?.credits ?? 0);
      }, 0),
    })),
  }));
};
