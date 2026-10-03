type CourseDetailsEmptyState = {
  description: string;
  testId: string;
  role?: 'alert';
  sectionClassName: string;
  textClassName: string;
};

export function getCourseDetailsProgramState(options: {
  hasSelectedCourse: boolean;
  hasPrograms: boolean;
  hasLoadedPrograms: boolean;
  programsLoading: boolean;
  programsError: string | null;
}) {
  const isProgramsLoading = options.programsLoading
    || (options.hasSelectedCourse && !options.hasLoadedPrograms && !options.programsError);
  const showNoProgramsState = options.hasSelectedCourse
    && !isProgramsLoading && !options.programsError && !options.hasPrograms;
  const shouldRenderCourseSection = options.hasSelectedCourse
    && !isProgramsLoading && !showNoProgramsState;

  return { isProgramsLoading, showNoProgramsState, shouldRenderCourseSection };
}

export function getCourseDetailsVisibility(options: {
  hasSelectedCourse: boolean;
  showNoProgramsState: boolean;
  shouldRenderCourseSection: boolean;
  hasBasicCourse: boolean;
  basicCourseLoading: boolean;
}) {
  const hasBasicCourseContent = options.hasBasicCourse || options.basicCourseLoading;
  return {
    showEmptyState: !options.hasSelectedCourse
      || (options.showNoProgramsState && !hasBasicCourseContent),
    showCourseSection: options.shouldRenderCourseSection
      || (options.showNoProgramsState && hasBasicCourseContent),
  };
}

export function getActiveProgramId(
  selectedProgramId: number | null,
  availablePrograms: Array<{ programId: number }>,
  selectedPlannerProgramId: number | null,
): number | null {
  if (
    selectedProgramId !== null
    && availablePrograms.some((program) => program.programId === selectedProgramId)
  ) {
    return selectedProgramId;
  }

  return selectedPlannerProgramId;
}

export function getCourseHeaderDescription(
  options: {
    basicCourseError?: string | null;
    courseDetailsError?: string;
    programsError?: string;
    isProgramsLoading: boolean;
    courseDetailsLoading: boolean;
    activeProgramId: number | null;
  },
  tCourseDetails: (key: string, values?: Record<string, unknown>) => string,
): string {
  if (options.activeProgramId === null && !options.basicCourseError) {
    return tCourseDetails('loadingCourse');
  }

  if (options.basicCourseError != null) {
    return options.basicCourseError;
  }

  if (options.courseDetailsError) {
    return options.courseDetailsError;
  }

  if (options.programsError) {
    return options.programsError;
  }

  if (options.isProgramsLoading) {
    return tCourseDetails('loadingPrograms');
  }

  if (options.courseDetailsLoading) {
    return tCourseDetails('loadingCourse');
  }

  if (!options.activeProgramId) {
    return tCourseDetails('selectProgramDescription');
  }

  return tCourseDetails('loadingCourse');
}

export function getCourseDetailsEmptyState(
  options: {
    hasInvalidCourseParam: boolean;
    showNoProgramsState: boolean;
    rawCourseId?: string;
  },
  tCourseDetails: (key: string, values?: Record<string, unknown>) => string,
): CourseDetailsEmptyState {
  if (options.hasInvalidCourseParam) {
    return {
      description: tCourseDetails('invalidCourse', { courseId: options.rawCourseId }),
      testId: 'course-details-invalid-description',
      role: 'alert',
      sectionClassName: 'border-destructive/20 bg-destructive/5',
      textClassName: 'text-destructive',
    };
  }

  if (options.showNoProgramsState) {
    return {
      description: tCourseDetails('noPrograms'),
      testId: 'course-details-no-programs-description',
      role: undefined,
      sectionClassName: 'border-border/70 bg-background/95 shadow-sm backdrop-blur-sm',
      textClassName: 'text-muted-foreground',
    };
  }

  return {
    description: tCourseDetails('pageDescription'),
    testId: 'course-details-empty-description',
    role: undefined,
    sectionClassName: 'border-border/70 bg-background/95 shadow-sm backdrop-blur-sm',
    textClassName: 'text-muted-foreground',
  };
}
