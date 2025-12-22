import type { SearchCoursesDto } from '@/api/types/course';

// Mock search results for MEC courses
export const COURSE_SEARCH_RESULTS: Record<string, SearchCoursesDto> = {
  MEC1: {
    courses: [
      {
        id: 352716,
        code: 'MEC111',
        title: 'Statique de l\'ingénieur',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2027',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2027',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'A2027',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2026',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'A2026',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
        ],
        prerequisites: [],
      },
      {
        id: 352722,
        code: 'MEC129',
        title: 'Développement de produits assisté par ordinateur',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2027',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2027',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'A2027',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2026',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'A2026',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
        ],
        prerequisites: [],
      },
    ],
    total: 2,
    hasMore: false,
  },
  MAT21: {
    courses: [
      {
        id: 352637,
        code: 'MAT210',
        title: 'Logique et mathématiques discrètes',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2026',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2026',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'A2026',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'H2025',
            availability: [
              'JOUR',
              'SOIR',
            ],
          },
          {
            sessionCode: 'E2025',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'A2025',
            availability: [
              'JOUR',
            ],
          },
        ],
        prerequisites: [
          {
            id: 352623,
            code: 'MAT145',
            title: 'Calcul différentiel et intégral',
            credits: 4,
            cycle: 1,
          },
        ],
      },
      {
        id: 352645,
        code: 'MAT215',
        title: 'Logique et mathématiques discrètes pour l’optimisation',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2026',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'E2026',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'H2025',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'E2025',
            availability: [
              'JOUR',
            ],
          },
          {
            sessionCode: 'A2025',
            availability: [
              'JOUR',
            ],
          },
        ],
        prerequisites: [
          {
            id: 352623,
            code: 'MAT145',
            title: 'Calcul différentiel et intégral',
            credits: 4,
            cycle: 1,
          },
        ],
      },
    ],
    total: 2,
    hasMore: false,
  },
};
