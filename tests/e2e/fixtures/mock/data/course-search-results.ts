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
  LOG: {
    courses: [
      {
        id: 352421,
        code: 'LOG240',
        title: 'Tests et maintenance',
        credits: 3,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'A2027',
            availability: [
              'JOUR',
            ],
          },
        ],
        prerequisites: [],
      },
      {
        id: 352405,
        code: 'LOG121',
        title: 'Conception orientée objet',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'E2026',
            availability: [
              'JOUR',
            ],
          },
        ],
        prerequisites: [],
      },
      {
        id: 352473,
        code: 'LOG460',
        title: 'Sécurité des logiciels',
        credits: 4,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2027',
            availability: [
              'SOIR',
            ],
          },
          {
            sessionCode: 'H2026',
            availability: [
              'SOIR',
            ],
          },
          {
            sessionCode: 'A2026',
            availability: [
              'JOUR',
            ],
          },
        ],
        prerequisites: [],
      },
    ],
    total: 3,
    hasMore: false,
  },
  MEC222: {
    courses: [
      {
        id: 352740,
        code: 'MEC222',
        title: 'Dynamique',
        credits: 3,
        cycle: 1,
        sessionAvailability: [
          {
            sessionCode: 'H2025',
            availability: ['JOUR'],
          },
        ],
        prerequisites: [],
        unstructuredPrerequisite: 'MEC111 et MAT145',
      },
    ],
    total: 1,
    hasMore: false,
  },
};
