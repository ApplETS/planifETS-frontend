'use client';

import type { ReactNode } from 'react';
import type { DuplicateAddData, PlannerContextType } from './types/PlannerContextType';

import { useAuthStore } from '@/store/authStore';
import { useSnackbar } from 'notistack';
import React from 'react';
import { coursesData } from '../../app/planner/courses-data';
import { generateEmptyYears } from '../../app/planner/empty-years-data';
import { useCourseMove } from '../../hooks/course/useCourseMove';
import { usePlannerState } from '../../hooks/planner/usePlannerState';
import { PlannerContext } from './context';
import { isSessionName } from './types/Session';

export const PlannerProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  const currentYear = new Date().getFullYear();
  const plannerState = usePlannerState(
    isLoggedIn ? coursesData : generateEmptyYears(currentYear, 4),
  );
  const { enqueueSnackbar } = useSnackbar();

  // Use our custom hook for course movement operations
  const { moveCourseBetweenSessions, addCourseToSession, removeCourseFromSession } = useCourseMove({
    plannerData: plannerState.plannerData,
    setPlannerData: plannerState.setPlannerData,
  });

  /**
   * Called if the user hits "Confirm / Add Anyway" in the duplicate dialog.
   */
  const confirmAddCourseAnyway = () => {
    if (!plannerState.duplicateAddData) {
      return;
    }
    const { newYear, newSessionName, course } = plannerState.duplicateAddData;
    if (!isSessionName(newSessionName)) {
      enqueueSnackbar('Invalid session name', { variant: 'error' });
      return;
    }

    addCourseToSession(newYear, newSessionName, course);
    plannerState.setDuplicateAddData(null);
  };

  /**
   * Called if the user hits "Cancel" in the duplicate dialog.
   */
  const cancelAddCourseAnyway = () => {
    plannerState.setDuplicateAddData(null);
  };

  const contextValue: PlannerContextType = {
    plannerData: plannerState.plannerData,
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
    deleteYear: plannerState.deleteYear,
    addYear: plannerState.addYear,
    duplicateAddData: plannerState.duplicateAddData as DuplicateAddData | null,
    confirmAddCourseAnyway,
    cancelAddCourseAnyway,
  };

  return (
    <PlannerContext value={contextValue}>
      {children}
    </PlannerContext>
  );
};
