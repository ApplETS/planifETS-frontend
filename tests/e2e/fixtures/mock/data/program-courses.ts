import type { ProgramCoursesResponseDto } from '@/api/types/program';

export const PROGRAM_COURSES_RESPONSE: ProgramCoursesResponseDto = {
  data: [
    {
      programCode: '7084',
      programTitle: 'Baccalauréat en génie logiciel',
      courses: [
        {
          id: 787696,
          code: 'ATE150',
          title: 'Règles de base en santé et sécurité',
          credits: 0,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'INTENSIF',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 352623,
          code: 'MAT145',
          title: 'Calcul différentiel et intégral',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 352377,
          code: 'ING150',
          title: 'Statique et dynamique',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 349710,
          code: 'CHM131',
          title: 'Chimie et matériaux',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 352399,
          code: 'LOG100',
          title: 'Programmation et réseautique en génie logiciel',
          credits: 4,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 787703,
          code: 'PRE013',
          title: 'Développement professionnel et santé et sécurité du travail en secteur informatique',
          credits: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'INTENSIF',
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'INTENSIF',
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 349682,
          code: 'ATE100',
          title: 'Intégrité intellectuelle',
          credits: 0,
          sessionAvailability: [
            {
              sessionCode: 'E2024',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'A2024',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'INTENSIF',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'INTENSIF',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 352405,
          code: 'LOG121',
          title: 'Conception orientée objet',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
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
              sessionCode: 'A2026',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: 'GTI100 (G.TI) ; LOG100 (G.Log)',
        },
        {
          id: 352637,
          code: 'MAT210',
          title: 'Logique et mathématiques discrètes',
          credits: 4,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352655,
          code: 'MAT265',
          title: 'Équations différentielles',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352383,
          code: 'ING160',
          title: 'Thermodynamique et mécanique des fluides',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'ING150',
              title: 'Statique et dynamique',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'ING150',
        },
        {
          id: 353422,
          code: 'PHY332',
          title: 'Électricité et magnétisme',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'CTN248 / ING150',
        },
        {
          id: 352413,
          code: 'LOG210',
          title: 'Analyse et conception de logiciels',
          credits: 4,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 352421,
          code: 'LOG240',
          title: 'Tests et maintenance',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [
            {
              code: 'LOG100',
              title: 'Programmation et réseautique en génie logiciel',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'LOG100',
        },
        {
          id: 351939,
          code: 'GTI510',
          title: 'Gestion de projets et assurance de la qualité',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'GTI210 et STA204 / TI: STA204, LOG: STA204 ou STA206',
        },
        {
          id: 352429,
          code: 'LOG320',
          title: 'Structures de données et algorithmes',
          credits: 4,
          sessionAvailability: [
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
              sessionCode: 'H2026',
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
            {
              sessionCode: 'E2026',
              availability: [
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
          prerequisites: [
            {
              code: 'MAT210',
              title: 'Logique et mathématiques discrètes',
            },
            {
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MAT210, LOG121',
        },
        {
          id: 353432,
          code: 'PHY335',
          title: 'Physique des ondes',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'CTN248 / ING150',
        },
        {
          id: 352449,
          code: 'LOG410',
          title: 'Analyse de besoins et spécifications',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [
            {
              code: 'LOG240',
              title: 'Tests et maintenance',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'LOG240',
        },
        {
          id: 353396,
          code: 'PEP110',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: '',
        },
        {
          id: 352694,
          code: 'MAT472',
          title: 'Algèbre linéaire et géométrie de l’espace',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 1232389,
          code: 'ETH310',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: null,
        },
        {
          id: 349762,
          code: 'COM410',
          title: 'Rédaction technique et communication en génie logiciel',
          credits: 3,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: '',
        },
        {
          id: 351911,
          code: 'GTI350',
          title: 'Conception et évaluation des interfaces utilisateurs',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [
            {
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352669,
          code: 'MAT350',
          title: 'Probabilités et statistiques',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 351989,
          code: 'GTI650',
          title: 'Introduction à l\'information quantique',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: '',
        },
        {
          id: 352531,
          code: 'LOG675',
          title: 'Programmation compétitive',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: '',
        },
        {
          id: 352457,
          code: 'LOG430',
          title: 'Architecture logicielle',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [
            {
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 351971,
          code: 'GTI611',
          title: 'Réseaux de communication IP',
          credits: 4,
          sessionAvailability: [
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
            {
              sessionCode: 'H2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'LOG100 ou GTI100 et LOG121 / LOG121',
        },
        {
          id: 352077,
          code: 'GTI755',
          title: 'Apprentissage machine quantique',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: null,
        },
        {
          id: 351053,
          code: 'GIA400',
          title: 'Analyse de rentabilité de projets',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'E2024',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2024',
              availability: [
                'JOUR',
                'SOIR',
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: '',
        },
        {
          id: 352523,
          code: 'LOG660',
          title: 'Bases de données de haute performance',
          credits: 4,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
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
              sessionCode: 'E2025',
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
              sessionCode: 'A2026',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'LOG320',
              title: 'Structures de données et algorithmes',
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'LOG320',
        },
        {
          id: 352517,
          code: 'LOG645',
          title: 'Architectures de calculs parallèles',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2026',
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
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 352499,
          code: 'LOG550',
          title: 'Conception de systèmes informatiques en temps réel',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
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
          ],
          prerequisites: [
            {
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352539,
          code: 'LOG680',
          title: 'Introduction à l\'approche DevOps',
          credits: 3,
          sessionAvailability: [
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
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'STA204 ou STA206',
        },
        {
          id: 352559,
          code: 'LOG721',
          title: 'Intergiciels pour applications distribués',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
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
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352567,
          code: 'LOG725',
          title: 'Ingénierie et conception de jeux vidéo',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'GTI320',
              title: 'Programmation mathématique : patrons et algorithmes efficaces',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'GTI320',
        },
        {
          id: 352587,
          code: 'LOG750',
          title: 'Infographie',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
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
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'GTI320 / MAT472',
        },
        {
          id: 352491,
          code: 'LOG530',
          title: 'Réingénierie du logiciel',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352473,
          code: 'LOG460',
          title: 'Sécurité des logiciels',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 352465,
          code: 'LOG450',
          title: 'Conception d’applications mobiles',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'GTI350 / GTI350, LOG121',
        },
        {
          id: 354038,
          code: 'TIN503',
          title: 'Environnement, technologie et société',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 352579,
          code: 'LOG736',
          title: 'Fondements des systèmes distribués',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'A2025',
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 351979,
          code: 'GTI619',
          title: 'Sécurité des systèmes',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'SOIR',
              ],
            },
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'GTI610 / GTI610 ou GTI611 / GTI611 / LOG121',
        },
        {
          id: 351901,
          code: 'GTI320',
          title: 'Programmation mathématique : patrons et algorithmes efficaces',
          credits: 3,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              code: 'MAT472',
              title: 'Algèbre linéaire et géométrie de l’espace',
            },
            {
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MAT472, LOG121',
        },
        {
          id: 352507,
          code: 'LOG635',
          title: 'Systèmes intelligents et algorithmes',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2026',
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
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG320 et MAT350 / MAT350, LOG320',
        },
        {
          id: 352549,
          code: 'LOG710',
          title: 'Principes des systèmes d’exploitation et programmation système',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'GTI310 (G.TI) ; LOG320 (G.Log)',
        },
        {
          id: 352595,
          code: 'LOG780',
          title: 'Sujets émergents en génie logiciel',
          credits: 3,
          sessionAvailability: [],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: null,
        },
        {
          id: 352021,
          code: 'GTI719',
          title: 'Sécurité des réseaux d\'entreprise',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'GTI619 / LOG121',
        },
        {
          id: 351957,
          code: 'GTI525',
          title: 'Technologies de développement Internet',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
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
              sessionCode: 'E2026',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'LOG210 / Minimum 47 Cr',
        },
        {
          id: 352603,
          code: 'LOG795',
          title: 'Projet de fin d’études en génie logiciel',
          credits: 4,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'Min. 99 crédits',
        },
        {
          id: 352601,
          code: 'LOG791',
          title: 'Projets spéciaux',
          credits: 3,
          sessionAvailability: [
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
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
                'SOIR',
              ],
            },
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'Autorisation du directeur de département',
        },
        {
          id: 350477,
          code: 'ELE674',
          title: 'Systèmes embarqués avancés',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: null,
        },
        {
          id: 350387,
          code: 'ELE641',
          title: 'Systèmes embarqués et normes en aérospatiale',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: null,
        },
        {
          id: 350371,
          code: 'ELE543',
          title: 'Principes des systèmes embarqués',
          credits: 4,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2025',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: null,
        },
        {
          id: 352057,
          code: 'GTI745',
          title: 'Interfaces utilisateurs avancées',
          credits: 3,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'GTI350; MAT472',
        },
        {
          id: 352035,
          code: 'GTI723',
          title: 'Test d’intrusion',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
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
          ],
          prerequisites: [
            {
              code: 'GTI619',
              title: 'Sécurité des systèmes',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'GTI619',
        },
        {
          id: 352029,
          code: 'GTI720',
          title: 'Protection des renseignements personnels',
          credits: 3,
          sessionAvailability: [
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
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 352005,
          code: 'GTI700',
          title: 'Principes et fondements de l’Internet des objets (IdO)',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2025',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
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
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'Min. 60 crédits',
        },
        {
          id: 352127,
          code: 'GTI780',
          title: 'Sujets émergents en technologie de l\'information',
          credits: 3,
          sessionAvailability: [
            {
              sessionCode: 'H2026',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: null,
        },
        {
          id: 352099,
          code: 'GTI771',
          title: 'Apprentissage machine avancé',
          credits: 3,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              code: 'MAT472',
              title: 'Algèbre linéaire et géométrie de l’espace',
            },
            {
              code: 'LOG635',
              title: 'Systèmes intelligents et algorithmes',
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MAT472, LOG635',
        },
      ],
    },
  ],
};
