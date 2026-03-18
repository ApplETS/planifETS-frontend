import type { DetailedProgramCourseDto, ProgramListDto } from '@/api/types/program';
import { PROGRAMS } from './programs';

const PROGRAM_IDS_BY_COURSE = new Map<number, number[]>([
  [352413, [182848, 182912]],
  [352716, [182864, 738518]],
  [352421, [182848]],
]);

const DETAILED_PROGRAM_COURSES: DetailedProgramCourseDto[] = [
  {
    courseId: 352413,
    programId: 182848,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG121',
    course: {
      code: 'LOG210',
      title: 'Analyse et conception de logiciels',
      credits: 4,
      description: 'Au terme de ce cours, l’étudiante ou l’étudiant sera en mesure : de maîtriser et appliquer des patrons de conception logicielle;de concevoir un logiciel orienté objet en appliquant un ensemble de principes et des méthodes heuristiques de génie logiciel; de réaliser un logiciel en suivant un processus itératif et évolutif incluant les activités d\'analyse et de conception par objets. Méthodes et techniques de modélisation orientés objet, langage de modélisation, cas...',
      cycle: 1,
      courseInstances: [
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'AUTOMNE',
          session: {
            trimester: 'AUTOMNE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2027,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2027,
          },
        },
      ],
    },
    prerequisites: [
      {
        prerequisite: {
          course: {
            id: 352405,
            code: 'LOG121',
            title: 'Conception orientée objet',
          },
        },
      },
    ],
  },
  {
    courseId: 352413,
    programId: 182912,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG121',
    course: {
      code: 'LOG210',
      title: 'Analyse et conception de logiciels',
      credits: 4,
      description: 'Au terme de ce cours, l’étudiante ou l’étudiant sera en mesure : de maîtriser et appliquer des patrons de conception logicielle;de concevoir un logiciel orienté objet en appliquant un ensemble de principes et des méthodes heuristiques de génie logiciel; de réaliser un logiciel en suivant un processus itératif et évolutif incluant les activités d\'analyse et de conception par objets. Méthodes et techniques de modélisation orientés objet, langage de modélisation, cas...',
      cycle: 1,
      courseInstances: [
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'AUTOMNE',
          session: {
            trimester: 'AUTOMNE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2027,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2027,
          },
        },
      ],
    },
    prerequisites: [
      {
        prerequisite: {
          course: {
            id: 352405,
            code: 'LOG121',
            title: 'Conception orientée objet',
          },
        },
      },
    ],
  },
  {
    courseId: 352716,
    programId: 182864,
    type: 'TRONC',
    typicalSessionIndex: 1,
    unstructuredPrerequisite: '',
    course: {
      code: 'MEC111',
      title: 'Statique de l\'ingénieur',
      credits: 4,
      description: 'Au terme de ce cours, l’étudiante ou l’étudiant maîtrisera les concepts fondamentaux de la statique et de la résistance des matériaux. Mettre en application des concepts de base de la méthodologie de projet dans la conception des structures de treillis et des membrures en flexion. À la fin de ce cours, l’étudiante ou l’étudiant sera en mesure : d’utiliser un vocabulaire technique précis dans toutes ses productions; de modéliser des systèmes mécaniques réels à l’aide...',
      cycle: 1,
      courseInstances: [
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'AUTOMNE',
          session: {
            trimester: 'AUTOMNE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2027,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2027,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2027,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2027,
          },
        },
      ],
    },
    prerequisites: [],
  },
  {
    courseId: 352716,
    programId: 738518,
    type: 'TRONC',
    typicalSessionIndex: 1,
    unstructuredPrerequisite: null,
    course: {
      code: 'MEC111',
      title: 'Statique de l\'ingénieur',
      credits: 4,
      description: 'Au terme de ce cours, l’étudiante ou l’étudiant maîtrisera les concepts fondamentaux de la statique et de la résistance des matériaux. Mettre en application des concepts de base de la méthodologie de projet dans la conception des structures de treillis et des membrures en flexion. À la fin de ce cours, l’étudiante ou l’étudiant sera en mesure : d’utiliser un vocabulaire technique précis dans toutes ses productions; de modéliser des systèmes mécaniques réels à l’aide...',
      cycle: 1,
      courseInstances: [
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'AUTOMNE',
          session: {
            trimester: 'AUTOMNE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2027,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2027,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2027,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2027,
          },
        },
      ],
    },
    prerequisites: [],
  },
  {
    courseId: 352421,
    programId: 182848,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG100',
    course: {
      code: 'LOG240',
      title: 'Tests et maintenance',
      credits: 3,
      description: 'Ce cours présente et applique les concepts du cycle de vie de la maintenance d\'un logiciel, la validation et la vérification d\'un logiciel, et les différents types de tests selon les principes du génie logiciel. Gestion de la configuration, transition d\'un logiciel du développement à la maintenance, éléments de maintenance de logiciel, types de maintenance, activités de maintenance, gestion des problèmes et amélioration de la maintenance du logiciel, principes de tests, conception de...',
      cycle: 1,
      courseInstances: [
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2026,
          sessionTrimester: 'ETE',
          session: {
            trimester: 'ETE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR', 'SOIR'],
          sessionYear: 2026,
          sessionTrimester: 'AUTOMNE',
          session: {
            trimester: 'AUTOMNE',
            year: 2026,
          },
        },
        {
          availability: ['JOUR'],
          sessionYear: 2027,
          sessionTrimester: 'HIVER',
          session: {
            trimester: 'HIVER',
            year: 2027,
          },
        },
      ],
    },
    prerequisites: [
      {
        prerequisite: {
          course: {
            id: 352399,
            code: 'LOG100',
            title: 'Programmation et réseautique en génie logiciel',
          },
        },
      },
    ],
  },
];

function getProgramListItem(programId: number): ProgramListDto {
  const program = PROGRAMS.find((candidate) => candidate.id === programId);

  if (!program) {
    throw new Error(`Missing test program fixture for programId ${programId}`);
  }

  return {
    programId: program.id,
    programCode: program.code,
    programTitle: program.title,
  };
}

export function getProgramsListByCourseIdFixture(courseId: number): ProgramListDto[] {
  const programIds = PROGRAM_IDS_BY_COURSE.get(courseId) ?? [];
  return programIds.map(getProgramListItem);
}

export function getDetailedProgramCourseFixture(
  courseId: number,
  programId: number,
): DetailedProgramCourseDto | null {
  return DETAILED_PROGRAM_COURSES.find(
    (course) => course.courseId === courseId && course.programId === programId,
  ) ?? null;
}
