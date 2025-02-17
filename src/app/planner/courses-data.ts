import type { YearData } from '@/types/planner';
import { SessionEnum } from '@/types/session';

const generateSessionKey_courseData = (year: number, sessionName: string): string =>
  `${year}-${sessionName}`;

// Initial data to populate the stores
export const coursesData: {
  courses: Array<{
    id: number;
    code: string;
    title: string;
    credits: number;
    prerequisites: string[];
    availability: string[];
  }>;
  sessions: YearData[];
} = {
  courses: [
    {
      id: 342343,
      code: 'MAT350',
      title: 'Stats',
      prerequisites: [],
      availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
      credits: 4,
    },
    {
      id: 343454,
      code: 'LOG100',
      title: 'Programmation réseau',
      prerequisites: [],
      availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
      credits: 4,
    },
    {
      id: 342454,
      code: 'MAT210',
      title: 'Calcul différentiel et intégral',
      prerequisites: [],
      availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
      credits: 4,
    },
    // ... other courses
  ],
  sessions: [
    {
      year: 2023,
      sessions: [
        {
          key: generateSessionKey_courseData(2023, SessionEnum.HIVER),
          year: 2023,
          name: SessionEnum.HIVER,
          courseInstances: [
            {
              courseId: 342343,
              status: 'Completed',
            },
          ],
          totalCredits: 8,
        },
        {
          key: generateSessionKey_courseData(2023, SessionEnum.ETE),
          year: 2023,
          name: SessionEnum.ETE,
          courseInstances: [],
          totalCredits: 0,
        },
        {
          key: generateSessionKey_courseData(2023, SessionEnum.AUTOMNE),
          year: 2023,
          name: SessionEnum.AUTOMNE,
          courseInstances: [],
          totalCredits: 0,
        },
      ],
    },
    // TODO: need to add 2024 for fun
  ],
};
