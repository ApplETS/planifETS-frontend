import type { Course } from '@/types/course';
import type { SessionName } from '../../context/planner/types/Session';

import type { YearData } from '../../context/planner/types/YearData';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import {
  addCourseToSession as addCourse,
  removeCourseFromSession as removeFromSession,
} from '../../context/planner/utils/courseUtils';
import { getSessionTiming, isCourseAvailable } from '../../context/planner/utils/sessionUtils';

type UseCourseMove = {
  plannerData: YearData[];
  setPlannerData: React.Dispatch<React.SetStateAction<YearData[]>>;
};

/**
 * Hook for managing course movement logic between sessions
 * Handles course status updates and validation
 * @param {UseCourseMove} props - Props containing planner data and state setter
 * @param {YearData[]} props.plannerData - Current state of the planner
 * @param {Function} props.setPlannerData - State setter for planner data
 * @returns {object} Course movement handlers and utility functions
 */
export const useCourseMove = ({
  plannerData,
  setPlannerData,
}: UseCourseMove) => {
  const { enqueueSnackbar } = useSnackbar();

  const determineCourseStatus = useCallback(
    (
      course: Course,
      year: number,
      sessionName: SessionName,
      isFuture: boolean,
    ): Course['status'] => {
      const isAvailable = isCourseAvailable(course, sessionName, year);

      if (!isAvailable) {
        return 'Not Offered';
      }

      if (isFuture) {
        return 'Planned';
      }

      return 'In Progress';
    },
    [],
  );

  const moveCourseBetweenSessions = useCallback(
    (
      fromYear: number,
      fromSession: SessionName,
      toYear: number,
      toSession: SessionName,
      course: Course,
    ) => {
      const timing = getSessionTiming(toYear, toSession);

      if (timing.isPast) {
        enqueueSnackbar(
          'Cannot move courses to past sessions',
          { variant: 'error' },
        );
        return;
      }

      const newPlannerData = [...plannerData];

      // Remove course from source session
      const fromYearIndex = newPlannerData.findIndex(y => y.year === fromYear);
      if (fromYearIndex === -1) {
        return;
      }

      const fromYearData = newPlannerData[fromYearIndex];
      if (!fromYearData) {
        return;
      }

      const fromSessionIndex = fromYearData.sessions.findIndex(
        s => s.name === fromSession,
      );
      if (fromSessionIndex === -1) {
        return;
      }

      // Remove course from source session
      const updatedFromYear = removeFromSession(
        fromYearData,
        fromSession,
        course.code,
      );
      newPlannerData[fromYearIndex] = updatedFromYear;

      // Add course to target session
      const toYearIndex = newPlannerData.findIndex(y => y.year === toYear);
      if (toYearIndex === -1) {
        return;
      }

      const toYearData = newPlannerData[toYearIndex];
      if (!toYearData) {
        return;
      }

      const toSessionIndex = toYearData.sessions.findIndex(
        s => s.name === toSession,
      );
      if (toSessionIndex === -1) {
        return;
      }

      const newStatus = determineCourseStatus(
        course,
        toYear,
        toSession,
        timing.isFuture,
      );

      const updatedCourse = { ...course, status: newStatus };
      const updatedToYear = addCourse(toYearData, toSession, updatedCourse);
      newPlannerData[toYearIndex] = updatedToYear;

      setPlannerData(newPlannerData);
    },
    [determineCourseStatus, enqueueSnackbar, plannerData, setPlannerData],
  );

  const addCourseToSession = useCallback(
    (year: number, sessionName: SessionName, course: Course) => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar(
          'Cannot add courses to past sessions',
          { variant: 'error' },
        );
        return;
      }

      const yearIndex = plannerData.findIndex(y => y.year === year);
      if (yearIndex === -1) {
        return;
      }

      const yearData = plannerData[yearIndex];
      if (!yearData) {
        return;
      }

      const sessionIndex = yearData.sessions.findIndex(
        s => s.name === sessionName,
      );
      if (sessionIndex === -1) {
        return;
      }

      const newStatus = determineCourseStatus(
        course,
        year,
        sessionName,
        timing.isFuture,
      );

      const updatedCourse = { ...course, status: newStatus };
      const newPlannerData = [...plannerData];
      const updatedYear = addCourse(yearData, sessionName, updatedCourse);
      newPlannerData[yearIndex] = updatedYear;

      setPlannerData(newPlannerData);
    },
    [determineCourseStatus, enqueueSnackbar, plannerData, setPlannerData],
  );

  const removeCourseFromSession = useCallback(
    (year: number, sessionName: SessionName, courseCode: string) => {
      const timing = getSessionTiming(year, sessionName);

      if (timing.isPast) {
        enqueueSnackbar(
          'Cannot remove courses from past sessions',
          { variant: 'error' },
        );
        return;
      }

      const yearIndex = plannerData.findIndex(y => y.year === year);
      if (yearIndex === -1) {
        return;
      }

      const yearData = plannerData[yearIndex];
      if (!yearData) {
        return;
      }

      const sessionIndex = yearData.sessions.findIndex(
        s => s.name === sessionName,
      );
      if (sessionIndex === -1) {
        return;
      }

      const newPlannerData = [...plannerData];
      const updatedYear = removeFromSession(yearData, sessionName, courseCode);
      newPlannerData[yearIndex] = updatedYear;

      setPlannerData(newPlannerData);
    },
    [enqueueSnackbar, plannerData, setPlannerData],
  );

  return {
    moveCourseBetweenSessions,
    addCourseToSession,
    removeCourseFromSession,
  };
};
