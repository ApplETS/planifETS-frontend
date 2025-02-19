import type { Course } from '@/types/course';
import type { YearData } from '@/types/planner';
import { SessionEnum } from '@/types/session';

const generateSessionKey_courseData = (year: number, sessionName: string): string =>
  `${year}-${sessionName}`;

// Initial data to populate the stores
export const coursesData: {
  courses: Array<Course>;
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
          sessionYear: 2023,
          sessionName: SessionEnum.HIVER,
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
          sessionYear: 2023,
          sessionName: SessionEnum.ETE,
          courseInstances: [],
          totalCredits: 0,
        },
        {
          key: generateSessionKey_courseData(2023, SessionEnum.AUTOMNE),
          sessionYear: 2023,
          sessionName: SessionEnum.AUTOMNE,
          courseInstances: [],
          totalCredits: 0,
        },
      ],
    },
    // TODO: need to add 2024 for fun
  ],
};
