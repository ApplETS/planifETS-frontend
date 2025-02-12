import type { Course } from '../../context/planner/types/Course';
import type { Session } from '../../context/planner/types/Session';
import type { YearData } from '../../context/planner/types/YearData';
import { useCallback, useState } from 'react';

/**
 * Hook for managing the planner's state and operations
 * Handles year management and course additions/removals
 *
 * @param {YearData[]} initialData - Initial planner data
 * @returns {object} Planner state and operations
 * @property {YearData[]} plannerData - Current state of the planner
 * @property {Function} addYear - Adds a new year to the planner
 * @property {Function} deleteYear - Removes a year from the planner
 * @property {Function} addCourseToSession - Adds a course to a specific session
 * @property {Function} moveCourseBetweenSessions - Moves a course between sessions
 * @property {Function} removeCourseFromSession - Removes a course from a session
 */
export const usePlannerState = (initialData: YearData[] = []) => {
  const [plannerData, setPlannerData] = useState<YearData[]>(initialData);

  const addYear = useCallback(() => {
    setPlannerData((prev) => {
      const maxYear = Math.max(...prev.map(y => y.year), 0);
      return [
        ...prev,
        {
          year: maxYear + 1,
          sessions: [
            { name: 'Automne', courses: [], totalCredits: 0 },
            { name: 'Hiver', courses: [], totalCredits: 0 },
            { name: 'Été', courses: [], totalCredits: 0 },
          ],
        },
      ];
    });
  }, []);

  const deleteYear = useCallback((year: number) => {
    setPlannerData(prev => prev.filter(y => y.year !== year));
  }, []);

  const addCourseToSession = useCallback(
    (year: number, sessionName: string, course: Course) => {
      setPlannerData(prev =>
        prev.map((y) => {
          if (y.year === year) {
            return {
              ...y,
              sessions: y.sessions.map((s: Session) => {
                if (s.name === sessionName) {
                  return {
                    ...s,
                    courses: [...s.courses, course],
                    totalCredits: s.totalCredits + course.credits,
                  };
                }
                return s;
              }),
            };
          }
          return y;
        }),
      );
    },
    [],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromYear: number,
      fromSession: string,
      toYear: number,
      toSession: string,
      course: Course,
    ) => {
      setPlannerData(prev =>
        prev.map((y) => {
          if (y.year === fromYear) {
            return {
              ...y,
              sessions: y.sessions.map((s: Session) => {
                if (s.name === fromSession) {
                  return {
                    ...s,
                    courses: s.courses.filter((c: Course) => c.code !== course.code),
                    totalCredits: s.totalCredits - course.credits,
                  };
                }
                return s;
              }),
            };
          }
          if (y.year === toYear) {
            return {
              ...y,
              sessions: y.sessions.map((s: Session) => {
                if (s.name === toSession) {
                  return {
                    ...s,
                    courses: [...s.courses, course],
                    totalCredits: s.totalCredits + course.credits,
                  };
                }
                return s;
              }),
            };
          }
          return y;
        }),
      );
    },
    [],
  );

  const removeCourseFromSession = useCallback(
    (year: number, sessionName: string, courseCode: string) => {
      setPlannerData(prev =>
        prev.map((y) => {
          if (y.year === year) {
            return {
              ...y,
              sessions: y.sessions.map((s: Session) => {
                if (s.name === sessionName) {
                  const courseToRemove = s.courses.find((c: Course) => c.code === courseCode);
                  return {
                    ...s,
                    courses: s.courses.filter((c: Course) => c.code !== courseCode),
                    totalCredits: s.totalCredits - (courseToRemove?.credits || 0),
                  };
                }
                return s;
              }),
            };
          }
          return y;
        }),
      );
    },
    [],
  );

  return {
    plannerData,
    setPlannerData,
    addYear,
    deleteYear,
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
  };
};
