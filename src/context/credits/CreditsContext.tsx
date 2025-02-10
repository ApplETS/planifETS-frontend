import type { Course, YearData } from '@/types/planner';
import { usePlannerContext } from '@/context/planner/usePlannerContext';
import { type FC, type ReactNode, useMemo } from 'react';
import { CreditsContext } from './context';

export const CreditsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { plannerData } = usePlannerContext();

  const totalCredits = useMemo(() => {
    return plannerData.reduce((yearTotal: number, yearData: YearData) => {
      return yearTotal + yearData.sessions.reduce((sessionTotal: number, session) => {
        return sessionTotal + session.courses.reduce((courseTotal: number, course: Course) => {
          return courseTotal + (course.credits || 0);
        }, 0);
      }, 0);
    }, 0);
  }, [plannerData]);

  const contextValue = useMemo(() => {
    return { totalCredits };
  }, [totalCredits]);

  return (
    <CreditsContext value={contextValue}>
      {children}
    </CreditsContext>
  );
};

export default CreditsProvider;
