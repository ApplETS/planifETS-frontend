import type { PlannerContextType } from './types/PlannerContextType';
import { createContext } from 'react';

export const PlannerContext = createContext<PlannerContextType>(null as unknown as PlannerContextType);
