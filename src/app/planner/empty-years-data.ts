import type { YearData } from '../../types/planner';
import { generateSessionKey, SessionEnum } from '@/types/session';

export const generateEmptyYears = (startYear: number, count: number): YearData[] => {
  return Array.from({ length: count }, (_, index) => ({
    year: startYear + index,
    sessions: [
      {
        key: generateSessionKey(startYear + index, SessionEnum.HIVER),
        name: SessionEnum.HIVER,
        year: startYear + index,
        courseInstances: [],
        totalCredits: 0,
      },
      {
        key: generateSessionKey(startYear + index, SessionEnum.ETE),
        name: SessionEnum.ETE,
        year: startYear + index,
        courseInstances: [],
        totalCredits: 0,
      },
      {
        key: generateSessionKey(startYear + index, SessionEnum.AUTOMNE),
        name: SessionEnum.AUTOMNE,
        year: startYear + index,
        courseInstances: [],
        totalCredits: 0,
      },
    ],
  }));
};
