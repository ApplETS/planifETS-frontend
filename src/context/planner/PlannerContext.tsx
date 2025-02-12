'use client';

import type { ReactNode } from 'react';
import type { PlannerContextType } from './types/PlannerContextType';

import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { coursesData } from '../../app/planner/courses-data';
import { generateEmptyYears } from '../../app/planner/empty-years-data';
import { useCourseMove } from '../../hooks/course/useCourseMove';
import { usePlannerState } from '../../hooks/planner/usePlannerState';
import { PlannerContext } from './context';

export const PlannerProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  const currentYear = new Date().getFullYear();
  const plannerState = usePlannerState(
    isLoggedIn ? coursesData : generateEmptyYears(currentYear, 4),
  );

  // Use our custom hook for course movement operations
  const { moveCourseBetweenSessions, addCourseToSession, removeCourseFromSession } = useCourseMove({
    plannerData: plannerState.plannerData,
    setPlannerData: plannerState.setPlannerData,
  });

  const contextValue: PlannerContextType = {
    plannerData: plannerState.plannerData,
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
    deleteYear: plannerState.deleteYear,
    addYear: plannerState.addYear,
  };

  return (
    <PlannerContext value={contextValue}>
      {children}
    </PlannerContext>
  );
};
