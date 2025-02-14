import type { PlannerContextType } from './types/PlannerContextType';
import { useContext } from 'react';
import { PlannerContext } from './context';

export const usePlannerContext = (): PlannerContextType => {
  const context = useContext(PlannerContext);
  if (!context) {
    console.error('usePlannerContext must be used within a PlannerProvider');
    throw new Error('usePlannerContext must be used within a PlannerProvider');
  }
  return context;
};
