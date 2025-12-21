import type { ProgramCoursesResponseDto } from '@/api/types/program';

// Mock data for /program-courses endpoint
// Generated from actual API response:
// /api/program-courses/programs?programCodes=7084&programCodes=7684
export const PROGRAM_COURSES_RESPONSE: ProgramCoursesResponseDto = {
  data: [
    {
      programCode: '7684',
      programTitle: 'Baccalauréat en génie mécanique',
      courses: [
        {
          id: 352722,
          code: 'MEC129',
          title: 'Développement de produits assisté par ordinateur',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 353444,
          code: 'PRE011',
          title: 'Développement professionnel et initiation à la santé et sécurité au travail',
          credits: 1,
          cycle: 1,
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
                'JOUR',
                'SOIR',
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
          id: 352716,
          code: 'MEC111',
          title: 'Statique de l\'ingénieur',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 787696,
          code: 'ATE150',
          title: 'Règles de base en santé et sécurité',
          credits: 0,
          cycle: 1,
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
          id: 349742,
          code: 'COM130',
          title: 'Méthodes de communication en génie mécanique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          id: 352623,
          code: 'MAT145',
          title: 'Calcul différentiel et intégral',
          credits: 4,
          cycle: 1,
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
          id: 349682,
          code: 'ATE100',
          title: 'Intégrité intellectuelle',
          credits: 0,
          cycle: 1,
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
          id: 352710,
          code: 'MEC029',
          title: 'Communication graphique et fabrication mécanique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
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
          ],
          prerequisites: [],
          type: 'PROFI',
          typicalSessionIndex: 1,
          unstructuredPrerequisite: '',
        },
        {
          id: 352750,
          code: 'MEC240',
          title: 'Thermodynamique',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: '',
        },
        {
          id: 352629,
          code: 'MAT165',
          title: 'Algèbre linéaire et analyse vectorielle',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352740,
          code: 'MEC222',
          title: 'Dynamique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: 'MEC111 et MAT145',
        },
        {
          id: 349710,
          code: 'CHM131',
          title: 'Chimie et matériaux',
          credits: 4,
          cycle: 1,
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
          typicalSessionIndex: 2,
          unstructuredPrerequisite: '',
        },
        {
          id: 1232389,
          code: 'ETH310',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: null,
        },
        {
          id: 353396,
          code: 'PEP110',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          cycle: 1,
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
          unstructuredPrerequisite: '',
        },
        {
          id: 352655,
          code: 'MAT265',
          title: 'Équations différentielles',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352732,
          code: 'MEC200',
          title: 'Technologie des matériaux',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 349710,
              code: 'CHM131',
              title: 'Chimie et matériaux',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'CHM131',
        },
        {
          id: 352764,
          code: 'MEC329',
          title: 'Résistance des matériaux',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 352716,
              code: 'MEC111',
              title: 'Statique de l\'ingénieur',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'MEC111',
        },
        {
          id: 352774,
          code: 'MEC335',
          title: 'Mécanique des fluides',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 352740,
              code: 'MEC222',
              title: 'Dynamique',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'MEC222',
        },
        {
          id: 352359,
          code: 'INF136',
          title: 'Introduction à la  programmation en Python',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          unstructuredPrerequisite: '',
        },
        {
          id: 352926,
          code: 'MEC636',
          title: 'Acoustique industrielle',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352740,
              code: 'MEC222',
              title: 'Dynamique',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MEC222',
        },
        {
          id: 352669,
          code: 'MAT350',
          title: 'Probabilités et statistiques',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 353422,
          code: 'PHY332',
          title: 'Électricité et magnétisme',
          credits: 4,
          cycle: 1,
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
          unstructuredPrerequisite: 'CTN248 / ING150',
        },
        {
          id: 352756,
          code: 'MEC300',
          title: 'Technologie de fabrication',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 352732,
              code: 'MEC200',
              title: 'Technologie des matériaux',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MEC200',
        },
        {
          id: 352790,
          code: 'MEC423',
          title: 'Méthode des éléments finis des corps déformables',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'INF135 et MEC329*',
        },
        {
          id: 351059,
          code: 'GIA410',
          title: 'Gestion et économie des projets d’ingénierie',
          credits: 3,
          cycle: 1,
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
          typicalSessionIndex: 5,
          unstructuredPrerequisite: '',
        },
        {
          id: 352808,
          code: 'MEC528',
          title: 'Éléments de machines',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 352790,
              code: 'MEC423',
              title: 'Méthode des éléments finis des corps déformables',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'MEC423',
        },
        {
          id: 352782,
          code: 'MEC402',
          title: 'Production et fabrication industrielles',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
              sessionCode: 'H2027',
              availability: [
                'JOUR',
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
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'MAT350*',
        },
        {
          id: 352866,
          code: 'MEC592',
          title: 'Projet de conception de machines',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 352722,
              code: 'MEC129',
              title: 'Développement de produits assisté par ordinateur',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352756,
              code: 'MEC300',
              title: 'Technologie de fabrication',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'MEC129, MEC300',
        },
        {
          id: 352818,
          code: 'MEC532',
          title: 'Transfert de chaleur',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC235 / MEC240',
        },
        {
          id: 352834,
          code: 'MEC555',
          title: 'Analyse des contraintes',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC329 et MEC423',
        },
        {
          id: 352844,
          code: 'MEC556',
          title: 'Aérothermodynamique des écoulements',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 352896,
          code: 'MEC627',
          title: 'Technologies de fabrication additive',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: '',
        },
        {
          id: 352880,
          code: 'MEC619',
          title: 'Mécanique des matériaux composites',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352764,
              code: 'MEC329',
              title: 'Résistance des matériaux',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC329',
        },
        {
          id: 352800,
          code: 'MEC525',
          title: 'Conception vibratoire et dynamique des structures',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MAT265 et MEC222 et MEC423',
        },
        {
          id: 352918,
          code: 'MEC634',
          title: 'Mise en forme des alliages : expérimentation et simulation',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352756,
              code: 'MEC300',
              title: 'Technologie de fabrication',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC300',
        },
        {
          id: 352944,
          code: 'MEC664',
          title: 'Optimisation des procédés industriels',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352669,
              code: 'MAT350',
              title: 'Probabilités et statistiques',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MAT350',
        },
        {
          id: 352858,
          code: 'MEC558',
          title: 'Introduction à la dynamique des fluides numériques',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 353042,
          code: 'MEC744',
          title: 'Manipulateurs robotiques',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352655,
              code: 'MAT265',
              title: 'Équations différentielles',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352740,
              code: 'MEC222',
              title: 'Dynamique',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'MAT265, MEC222',
        },
        {
          id: 353068,
          code: 'MEC755',
          title: 'Gestion de projets industriels avancée',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 351059,
              code: 'GIA410',
              title: 'Gestion et économie des projets d’ingénierie',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'GIA410',
        },
        {
          id: 352826,
          code: 'MEC546',
          title: 'Circuits électriques et électrotechnique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [
            {
              id: 353422,
              code: 'PHY332',
              title: 'Électricité et magnétisme',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'PHY332',
        },
        {
          id: 353115,
          code: 'MEC786',
          title: 'Mise en forme de polymères et composites',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: '',
        },
        {
          id: 352143,
          code: 'GTS501',
          title: 'Ingénierie des systèmes humains',
          credits: 3,
          cycle: 1,
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
          typicalSessionIndex: 6,
          unstructuredPrerequisite: '',
        },
        {
          id: 353020,
          code: 'MEC738',
          title: 'Conception et analyse des assemblages',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352790,
              code: 'MEC423',
              title: 'Méthode des éléments finis des corps déformables',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC423',
        },
        {
          id: 352852,
          code: 'MEC557',
          title: 'Méthodes expérimentales en thermofluide',
          credits: 3,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: null,
        },
        {
          id: 353062,
          code: 'MEC754',
          title: 'Optimisation en production manufacturière',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: null,
        },
        {
          id: 352155,
          code: 'GTS503',
          title: 'Technologies de la santé, normes et homologation',
          credits: 3,
          cycle: 1,
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
          unstructuredPrerequisite: '',
        },
        {
          id: 352876,
          code: 'MEC602',
          title: 'Tolérancement et métrologie tridimensionnelle',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352669,
              code: 'MAT350',
              title: 'Probabilités et statistiques',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MAT350',
        },
        {
          id: 352888,
          code: 'MEC625',
          title: 'Technologie du soudage',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352732,
              code: 'MEC200',
              title: 'Technologie des matériaux',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC200',
        },
        {
          id: 352952,
          code: 'MEC671',
          title: 'Design conceptuel des aéronefs',
          credits: 3,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 352988,
          code: 'MEC730',
          title: 'Climatisation et réfrigération industrielles',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 353004,
          code: 'MEC735',
          title: 'Conception intégrée des systèmes mécaniques dans les bâtiments',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
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
          id: 353034,
          code: 'MEC743',
          title: 'Instrumentation et contrôle des procédés industriels',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 353422,
              code: 'PHY332',
              title: 'Électricité et magnétisme',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'PHY332',
        },
        {
          id: 353076,
          code: 'MEC757',
          title: 'Introduction à l’aérodynamique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 353093,
          code: 'MEC761',
          title: 'Essais mécaniques et contrôle non destructif',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352732,
              code: 'MEC200',
              title: 'Technologie des matériaux',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC200',
        },
        {
          id: 353123,
          code: 'MEC788',
          title: 'Mécatronique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC222 et MEC546*',
        },
        {
          id: 352902,
          code: 'MEC628',
          title: 'Conception de systèmes à fluide sous pression',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 352934,
          code: 'MEC652',
          title: 'Conception des systèmes manufacturiers',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'BACC.: MAT350 OU Cert.: MAT321',
        },
        {
          id: 352910,
          code: 'MEC630',
          title: 'Ventilation et chauffage',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 352968,
          code: 'MEC723',
          title: 'Fabrication numérique',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 353052,
          code: 'MEC745',
          title: 'Robotique mobile',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352655,
              code: 'MAT265',
              title: 'Équations différentielles',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352740,
              code: 'MEC222',
              title: 'Dynamique',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MAT265, MEC222',
        },
        {
          id: 943701,
          code: 'AER671',
          title: 'Design conceptuel des aéronefs',
          credits: 3,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: '',
        },
        {
          id: 352173,
          code: 'GTS602',
          title: 'Conception d\'orthèses et de prothèses',
          credits: 3,
          cycle: 1,
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 352179,
          code: 'GTS610',
          title: 'Modélisation et traitement des signaux biomédicaux',
          credits: 3,
          cycle: 1,
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
          id: 354044,
          code: 'TIN504',
          title: 'Santé, technologie et société',
          credits: 3,
          cycle: 1,
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
              sessionCode: 'H2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 352197,
          code: 'GTS640',
          title: 'Dossier électronique de santé',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 353085,
          code: 'MEC758',
          title: 'Systèmes de propulsion : thermopropulsion et turbomachines',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
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
          id: 352167,
          code: 'GTS601',
          title: 'Principes de l\'imagerie médicale',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2025',
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
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 353135,
          code: 'MEC795',
          title: 'Projet de fin d\'études en génie mécanique',
          credits: 4,
          cycle: 1,
          sessionAvailability: [
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
              sessionCode: 'H2027',
              availability: [
                'JOUR',
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
              ],
            },
          ],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'Minimum 99 Cr',
        },
        {
          id: 352996,
          code: 'MEC733',
          title: 'Gestion d\'énergie dans les bâtiments',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 352958,
          code: 'MEC702',
          title: 'Techniques de maintenance prédictive et fiabilité',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MAT350 et MEC525',
        },
        {
          id: 349654,
          code: 'AER600',
          title: 'Introduction à l’aérospatiale',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 353012,
          code: 'MEC737',
          title: 'Moteurs alternatifs à combustion interne',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352774,
              code: 'MEC335',
              title: 'Mécanique des fluides',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MEC335',
        },
        {
          id: 352161,
          code: 'GTS504',
          title: 'Introduction à l\'ingénierie de la réadaptation',
          credits: 3,
          cycle: 1,
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
          unstructuredPrerequisite: '',
        },
        {
          id: 352149,
          code: 'GTS502',
          title: 'Risques dans le secteur de la santé : sources et techniques d’évaluation',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2025',
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
              sessionCode: 'A2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 352980,
          code: 'MEC729',
          title: 'Mécanismes et dynamique des machines',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352740,
              code: 'MEC222',
              title: 'Dynamique',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MEC222',
        },
        {
          id: 353109,
          code: 'MEC785',
          title: 'Méthodologie de conception pour la fabrication et l’assemblage',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
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
            {
              sessionCode: 'E2027',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'A2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 352974,
          code: 'MEC727',
          title: 'Tribologie',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'A2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'E2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 354038,
          code: 'TIN503',
          title: 'Environnement, technologie et société',
          credits: 3,
          cycle: 1,
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
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 353133,
          code: 'MEC791',
          title: 'Projets spéciaux',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'E2026',
              availability: [
                'JOUR',
              ],
            },
            {
              sessionCode: 'A2026',
              availability: [
                'SOIR',
              ],
            },
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
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
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'Autorisation du directeur de département',
        },
        {
          id: 351077,
          code: 'GIA602',
          title: 'Ergonomie et sécurité en milieu industriel',
          credits: 3,
          cycle: 1,
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
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 353101,
          code: 'MEC781',
          title: 'Méthodes d’usinage avancées',
          credits: 3,
          cycle: 1,
          sessionAvailability: [
            {
              sessionCode: 'H2027',
              availability: [
                'SOIR',
              ],
            },
          ],
          prerequisites: [
            {
              id: 352756,
              code: 'MEC300',
              title: 'Technologie de fabrication',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MEC300',
        },
        {
          id: 352191,
          code: 'GTS620',
          title: 'Biomatériaux pour dispositifs médicaux',
          credits: 3,
          cycle: 1,
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
            {
              sessionCode: 'H2027',
              availability: [
                'JOUR',
              ],
            },
          ],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
        {
          id: 352185,
          code: 'GTS615',
          title: 'Instrumentation biomédicale',
          credits: 3,
          cycle: 1,
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
          typicalSessionIndex: 8,
          unstructuredPrerequisite: '',
        },
      ],
    },
    {
      programCode: '7084',
      programTitle: 'Baccalauréat en génie logiciel',
      courses: [
        {
          id: 352623,
          code: 'MAT145',
          title: 'Calcul différentiel et intégral',
          credits: 4,
          cycle: 1,
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
          cycle: 1,
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
          id: 349710,
          code: 'CHM131',
          title: 'Chimie et matériaux',
          credits: 4,
          cycle: 1,
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
          cycle: 1,
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
          id: 787703,
          code: 'PRE013',
          title: 'Développement professionnel et santé et sécurité du travail en secteur informatique',
          credits: 1,
          cycle: 1,
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
          cycle: 1,
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
          id: 787696,
          code: 'ATE150',
          title: 'Règles de base en santé et sécurité',
          credits: 0,
          cycle: 1,
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
          id: 352637,
          code: 'MAT210',
          title: 'Logique et mathématiques discrètes',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 2,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352405,
          code: 'LOG121',
          title: 'Conception orientée objet',
          credits: 4,
          cycle: 1,
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
          id: 352383,
          code: 'ING160',
          title: 'Thermodynamique et mécanique des fluides',
          credits: 4,
          cycle: 1,
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
              id: 352377,
              code: 'ING150',
              title: 'Statique et dynamique',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'ING150',
        },
        {
          id: 352655,
          code: 'MAT265',
          title: 'Équations différentielles',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352421,
          code: 'LOG240',
          title: 'Tests et maintenance',
          credits: 3,
          cycle: 1,
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
              id: 352399,
              code: 'LOG100',
              title: 'Programmation et réseautique en génie logiciel',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'LOG100',
        },
        {
          id: 352413,
          code: 'LOG210',
          title: 'Analyse et conception de logiciels',
          credits: 4,
          cycle: 1,
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
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 3,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 353422,
          code: 'PHY332',
          title: 'Électricité et magnétisme',
          credits: 4,
          cycle: 1,
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
          id: 352449,
          code: 'LOG410',
          title: 'Analyse de besoins et spécifications',
          credits: 3,
          cycle: 1,
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
              id: 352421,
              code: 'LOG240',
              title: 'Tests et maintenance',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'LOG240',
        },
        {
          id: 351911,
          code: 'GTI350',
          title: 'Conception et évaluation des interfaces utilisateurs',
          credits: 4,
          cycle: 1,
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
              id: 352413,
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 353432,
          code: 'PHY335',
          title: 'Physique des ondes',
          credits: 4,
          cycle: 1,
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
          id: 1232389,
          code: 'ETH310',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: null,
        },
        {
          id: 351939,
          code: 'GTI510',
          title: 'Gestion de projets et assurance de la qualité',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
              id: 352637,
              code: 'MAT210',
              title: 'Logique et mathématiques discrètes',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MAT210, LOG121',
        },
        {
          id: 349762,
          code: 'COM410',
          title: 'Rédaction technique et communication en génie logiciel',
          credits: 3,
          cycle: 1,
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
          id: 353396,
          code: 'PEP110',
          title: 'Encadrement de la profession et éthique professionnelle',
          credits: 1,
          cycle: 1,
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
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 4,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 351989,
          code: 'GTI650',
          title: 'Introduction à l\'information quantique',
          credits: 3,
          cycle: 1,
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
          id: 352669,
          code: 'MAT350',
          title: 'Probabilités et statistiques',
          credits: 4,
          cycle: 1,
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
              id: 352623,
              code: 'MAT145',
              title: 'Calcul différentiel et intégral',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 5,
          unstructuredPrerequisite: 'MAT145',
        },
        {
          id: 352531,
          code: 'LOG675',
          title: 'Programmation compétitive',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
              id: 352413,
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
              credits: 4,
              cycle: 1,
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
          cycle: 1,
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
          cycle: 1,
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
          cycle: 1,
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
          cycle: 1,
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
              id: 352429,
              code: 'LOG320',
              title: 'Structures de données et algorithmes',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'TRONC',
          typicalSessionIndex: 6,
          unstructuredPrerequisite: 'LOG320',
        },
        {
          id: 352595,
          code: 'LOG780',
          title: 'Sujets émergents en génie logiciel',
          credits: 3,
          cycle: 1,
          sessionAvailability: [],
          prerequisites: [],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: null,
        },
        {
          id: 351901,
          code: 'GTI320',
          title: 'Programmation mathématique : patrons et algorithmes efficaces',
          credits: 3,
          cycle: 1,
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
              id: 352694,
              code: 'MAT472',
              title: 'Algèbre linéaire et géométrie de l’espace',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'MAT472, LOG121',
        },
        {
          id: 351979,
          code: 'GTI619',
          title: 'Sécurité des systèmes',
          credits: 3,
          cycle: 1,
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
          id: 352465,
          code: 'LOG450',
          title: 'Conception d’applications mobiles',
          credits: 3,
          cycle: 1,
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
          id: 352473,
          code: 'LOG460',
          title: 'Sécurité des logiciels',
          credits: 3,
          cycle: 1,
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
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 352491,
          code: 'LOG530',
          title: 'Réingénierie du logiciel',
          credits: 3,
          cycle: 1,
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
              id: 352413,
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352499,
          code: 'LOG550',
          title: 'Conception de systèmes informatiques en temps réel',
          credits: 3,
          cycle: 1,
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
              id: 352413,
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 7,
          unstructuredPrerequisite: 'LOG210',
        },
        {
          id: 352517,
          code: 'LOG645',
          title: 'Architectures de calculs parallèles',
          credits: 3,
          cycle: 1,
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
          id: 352539,
          code: 'LOG680',
          title: 'Introduction à l\'approche DevOps',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
              id: 352413,
              code: 'LOG210',
              title: 'Analyse et conception de logiciels',
              credits: 4,
              cycle: 1,
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
          cycle: 1,
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
              id: 351901,
              code: 'GTI320',
              title: 'Programmation mathématique : patrons et algorithmes efficaces',
              credits: 3,
              cycle: 1,
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
          cycle: 1,
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
          id: 354038,
          code: 'TIN503',
          title: 'Environnement, technologie et société',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
          id: 352507,
          code: 'LOG635',
          title: 'Systèmes intelligents et algorithmes',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
          id: 352099,
          code: 'GTI771',
          title: 'Apprentissage machine avancé',
          credits: 3,
          cycle: 1,
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
              id: 352694,
              code: 'MAT472',
              title: 'Algèbre linéaire et géométrie de l’espace',
              credits: 4,
              cycle: 1,
            },
            {
              id: 352507,
              code: 'LOG635',
              title: 'Systèmes intelligents et algorithmes',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'MAT472, LOG635',
        },
        {
          id: 352603,
          code: 'LOG795',
          title: 'Projet de fin d’études en génie logiciel',
          credits: 4,
          cycle: 1,
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
          cycle: 1,
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
          id: 352021,
          code: 'GTI719',
          title: 'Sécurité des réseaux d\'entreprise',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
          id: 352005,
          code: 'GTI700',
          title: 'Principes et fondements de l’Internet des objets (IdO)',
          credits: 3,
          cycle: 1,
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
          id: 352029,
          code: 'GTI720',
          title: 'Protection des renseignements personnels',
          credits: 3,
          cycle: 1,
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
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
              credits: 4,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'LOG121',
        },
        {
          id: 352035,
          code: 'GTI723',
          title: 'Test d’intrusion',
          credits: 3,
          cycle: 1,
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
              id: 351979,
              code: 'GTI619',
              title: 'Sécurité des systèmes',
              credits: 3,
              cycle: 1,
            },
          ],
          type: 'CONCE',
          typicalSessionIndex: 8,
          unstructuredPrerequisite: 'GTI619',
        },
        {
          id: 352057,
          code: 'GTI745',
          title: 'Interfaces utilisateurs avancées',
          credits: 3,
          cycle: 1,
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
          id: 350477,
          code: 'ELE674',
          title: 'Systèmes embarqués avancés',
          credits: 3,
          cycle: 1,
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
          cycle: 1,
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
          cycle: 1,
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
          id: 352127,
          code: 'GTI780',
          title: 'Sujets émergents en technologie de l\'information',
          credits: 3,
          cycle: 1,
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
      ],
    },
  ],
};
