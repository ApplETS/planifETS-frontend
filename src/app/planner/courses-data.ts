import type { YearData } from '../../types/planner';

export const coursesData: YearData[] = [
  {
    year: 2023,
    sessions: [
      {
        name: 'Hiver',
        courses: [
          {
            code: 'MAT145',
            title: 'Calcul différentiel et intégral',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Completed',
          },
          {
            code: 'LOG100',
            title: 'Programmation réseau',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Failed',
          },
        ],
        totalCredits: 8,
      },
      {
        name: 'Été',
        courses: [
          {
            code: 'MAT350',
            title: 'Stats',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Completed',
          },
          {
            code: 'LOG100',
            title: 'Programmation réseau',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Completed',
          },
        ],
        totalCredits: 4,
      },
      {
        name: 'Automne',
        courses: [
          {
            code: 'MAT210',
            title: 'Calcul différentiel et intégral',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Completed',
          },
          {
            code: 'LOG210',
            title: 'Analyse et conception de logiciels',
            credits: 4,
            availability: ['A24', 'H25', 'É25', 'A25', 'H26'],
            prerequisites: ['LOG121'],
          },
        ],
        totalCredits: 4,
      },
    ],
  },
  {
    year: 2024,
    sessions: [
      {
        name: 'Hiver',
        courses: [
          {
            code: 'GIA400',
            title: 'Programmation réseau',
            prerequisites: [],
            availability: ['H24', 'E24', 'A24', 'H25', 'E25', 'A25'],
            credits: 4,
            status: 'Completed',
          },
        ],
        totalCredits: 4,
      },
      {
        name: 'Été',
        courses: [],
        totalCredits: 0,
      },
      {
        name: 'Automne',
        courses: [
          {
            code: 'GTI350',
            title: 'Programmation réseau',
            prerequisites: ['LOG210'],
            availability: ['A24', 'H25', 'É25', 'A25', 'H26'],
            credits: 4,
            status: 'In Progress',
          },
        ],
        totalCredits: 4,
      },
    ],
  },
  {
    year: 2025,
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
  },
  {
    year: 2026,
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
  },
];
