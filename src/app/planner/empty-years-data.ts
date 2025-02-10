import type { YearData } from '../../types/planner';

export const generateEmptyYears = (startYear: number, count: number): YearData[] => {
  return Array.from({ length: count }, (_, index) => ({
    year: startYear + index,
    sessions: [
      {
        name: 'Hiver',
        courses: [],
        totalCredits: 0,
      },
      {
        name: 'Été',
        courses: [],
        totalCredits: 0,
      },
      {
        name: 'Automne',
        courses: [],
        totalCredits: 0,
      },
    ],
  }));
};
