import type {
  CourseAvailabilityDto,
  DetailedProgramCourseDto,
  DetailedProgramCourseInfoDto,
  DetailedProgramCourseInstanceDto,
  DetailedProgramCoursePrerequisiteDto,
  ProgramListDto,
  SessionTrimesterDto,
} from '@/api/types/program';
import { PROGRAMS } from './programs';

const PROGRAM_IDS_BY_COURSE = new Map<number, number[]>([
  [352413, [182848, 182912]],
  [352716, [182864, 738518]],
  [352421, [182848]],
]);

function createCourseInstance(
  sessionTrimester: SessionTrimesterDto,
  sessionYear: number,
  availability: CourseAvailabilityDto[],
): DetailedProgramCourseInstanceDto {
  return {
    availability,
    sessionYear,
    sessionTrimester,
    session: {
      trimester: sessionTrimester,
      year: sessionYear,
    },
  };
}

function createCourseInfo(course: DetailedProgramCourseInfoDto): DetailedProgramCourseInfoDto {
  return course;
}

function createPrerequisite(
  id: number,
  code: string,
  title: string,
): DetailedProgramCoursePrerequisiteDto {
  return {
    prerequisite: {
      course: {
        id,
        code,
        title,
      },
    },
  };
}

function createDetailedProgramCourse(
  fixture: DetailedProgramCourseDto,
): DetailedProgramCourseDto {
  return fixture;
}

const LOG210_COURSE = createCourseInfo({
  code: 'LOG210',
  title: 'Analyse et conception de logiciels',
  credits: 4,
  description: 'Au terme de ce cours, l’étudiante ou l’étudiant sera en mesure : de maîtriser et appliquer des patrons de conception logicielle;de concevoir un logiciel orienté objet en appliquant un ensemble de principes et des méthodes heuristiques de génie logiciel; de réaliser un logiciel en suivant un processus itératif et évolutif incluant les activités d\'analyse et de conception par objets. Méthodes et techniques de modélisation orientés objet, langage de modélisation, cas...',
  cycle: 1,
  courseInstances: [
    createCourseInstance('HIVER', 2026, ['JOUR', 'SOIR']),
    createCourseInstance('ETE', 2026, ['JOUR']),
    createCourseInstance('AUTOMNE', 2026, ['JOUR']),
    createCourseInstance('HIVER', 2027, ['JOUR', 'SOIR']),
  ],
});

const LOG210_PREREQUISITES = [
  createPrerequisite(352405, 'LOG121', 'Conception orientée objet'),
];

const MEC111_COURSE = createCourseInfo({
  code: 'MEC111',
  title: 'Statique de l\'ingénieur',
  credits: 4,
  description: 'Au terme de ce cours, l’étudiante ou l’étudiant maîtrisera les concepts fondamentaux de la statique et de la résistance des matériaux. Mettre en application des concepts de base de la méthodologie de projet dans la conception des structures de treillis et des membrures en flexion. À la fin de ce cours, l’étudiante ou l’étudiant sera en mesure : d’utiliser un vocabulaire technique précis dans toutes ses productions; de modéliser des systèmes mécaniques réels à l’aide...',
  cycle: 1,
  courseInstances: [
    createCourseInstance('HIVER', 2026, ['JOUR', 'SOIR']),
    createCourseInstance('ETE', 2026, ['JOUR']),
    createCourseInstance('AUTOMNE', 2026, ['JOUR', 'SOIR']),
    createCourseInstance('HIVER', 2027, ['JOUR', 'SOIR']),
    createCourseInstance('ETE', 2027, ['JOUR']),
  ],
});

const LOG240_COURSE = createCourseInfo({
  code: 'LOG240',
  title: 'Tests et maintenance',
  credits: 3,
  description: 'Ce cours présente et applique les concepts du cycle de vie de la maintenance d\'un logiciel, la validation et la vérification d\'un logiciel, et les différents types de tests selon les principes du génie logiciel. Gestion de la configuration, transition d\'un logiciel du développement à la maintenance, éléments de maintenance de logiciel, types de maintenance, activités de maintenance, gestion des problèmes et amélioration de la maintenance du logiciel, principes de tests, conception de...',
  cycle: 1,
  courseInstances: [
    createCourseInstance('HIVER', 2026, ['JOUR']),
    createCourseInstance('ETE', 2026, ['JOUR']),
    createCourseInstance('AUTOMNE', 2026, ['JOUR', 'SOIR']),
    createCourseInstance('HIVER', 2027, ['JOUR']),
  ],
});

const LOG240_PREREQUISITES = [
  createPrerequisite(352399, 'LOG100', 'Programmation et réseautique en génie logiciel'),
];

const DETAILED_PROGRAM_COURSES: DetailedProgramCourseDto[] = [
  createDetailedProgramCourse({
    courseId: 352413,
    programId: 182848,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG121',
    course: LOG210_COURSE,
    prerequisites: LOG210_PREREQUISITES,
  }),
  createDetailedProgramCourse({
    courseId: 352413,
    programId: 182912,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG121',
    course: LOG210_COURSE,
    prerequisites: LOG210_PREREQUISITES,
  }),
  createDetailedProgramCourse({
    courseId: 352716,
    programId: 182864,
    type: 'TRONC',
    typicalSessionIndex: 1,
    unstructuredPrerequisite: '',
    course: MEC111_COURSE,
    prerequisites: [],
  }),
  createDetailedProgramCourse({
    courseId: 352716,
    programId: 738518,
    type: 'TRONC',
    typicalSessionIndex: 1,
    unstructuredPrerequisite: null,
    course: MEC111_COURSE,
    prerequisites: [],
  }),
  createDetailedProgramCourse({
    courseId: 352421,
    programId: 182848,
    type: 'TRONC',
    typicalSessionIndex: 3,
    unstructuredPrerequisite: 'LOG100',
    course: LOG240_COURSE,
    prerequisites: LOG240_PREREQUISITES,
  }),
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
  return structuredClone(programIds.map(getProgramListItem));
}

export function getDetailedProgramCourseFixture(
  courseId: number,
  programId: number,
): DetailedProgramCourseDto | null {
  const course = DETAILED_PROGRAM_COURSES.find(
    (candidate) => candidate.courseId === courseId && candidate.programId === programId,
  );

  return course ? structuredClone(course) : null;
}
