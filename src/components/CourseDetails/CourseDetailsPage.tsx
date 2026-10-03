'use client';

import type { BasicCourseDto } from '@/api/types/course';
import type { DetailedProgramCourseDto, DetailedProgramCourseInfoDto } from '@/api/types/program';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { useCourseByIdApi } from '@/api/hooks/useCourseByIdApi';
import { useDetailedProgramCourseApi } from '@/api/hooks/useDetailedProgramCourseApi';
import { useProgramsListByCourseIdApi } from '@/api/hooks/useProgramsListByCourseIdApi';
import Tag from '@/components/atoms/Tag';
import ProgramSelector from '@/components/CourseDetails/ProgramSelector';
import OfferingsSection from '@/components/CourseDetails/sections/OfferingsSection';
import PageSection from '@/components/CourseDetails/sections/PageSection';
import PrerequisitesSection from '@/components/CourseDetails/sections/PrerequisitesSection';
import { showError } from '@/lib/toast';
import { cn } from '@/shadcn/lib/utils';
import { useProgramStore } from '@/store/programStore';
import {
  getActiveProgramId,
  getCourseDetailsEmptyState,
  getCourseDetailsProgramState,
  getCourseDetailsVisibility,
  getCourseHeaderDescription,
} from '@/utils/courseDetailsUtil';
import { parsePositiveInteger } from '@/utils/numberUtil';
import { getETSCourseDetailsHref } from '@/utils/routesUtil';
import CourseSearchSelect from './CourseSearchSelect';

type TranslationFn = (key: string, values?: Record<string, unknown>) => string;
type DisplayCourse = BasicCourseDto | DetailedProgramCourseInfoDto;

const useInvalidCourseParamToast = (
  rawCourseId: string | undefined,
  hasInvalidCourseParam: boolean,
  tCourseDetails: TranslationFn,
) => {
  const invalidToastCourseIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!hasInvalidCourseParam || typeof rawCourseId !== 'string') {
      invalidToastCourseIdRef.current = null;
      return;
    }

    if (invalidToastCourseIdRef.current === rawCourseId) {
      return;
    }

    invalidToastCourseIdRef.current = rawCourseId;
    showError(tCourseDetails('invalidCourse'));
  }, [hasInvalidCourseParam, rawCourseId, tCourseDetails]);
};

type CourseHeaderContentProps = {
  course: DisplayCourse | null;
  courseDetails: DetailedProgramCourseDto | null;
  courseHeaderDescription: string;
  tCourseDetails: TranslationFn;
  tCommons: TranslationFn;
};

const CourseHeaderContent = ({
  course,
  courseDetails,
  courseHeaderDescription,
  tCourseDetails,
  tCommons,
}: CourseHeaderContentProps) => {
  if (!course) {
    return (
      <p className="mt-1 max-w-3xl text-lg leading-tight text-muted-foreground">
        {courseHeaderDescription}
      </p>
    );
  }

  return (
    <>
      <h2
        className="text-2xl font-semibold tracking-tight text-foreground"
        data-testid="course-details-code"
      >
        {course.code}
      </h2>
      <p
        className="mt-1 max-w-3xl text-lg leading-tight text-foreground"
        data-testid="course-details-title"
      >
        {course.title}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Tag variant="credits">
            {course.credits}
            {' '}
            {tCommons('credits')}
          </Tag>
          <Tag variant="sessionAvailable">
            {tCourseDetails('cycle')}
            {' '}
            {course.cycle}
          </Tag>
          {courseDetails?.type
            ? (
              <Tag variant="sessionAvailable">
                {tCourseDetails('requirementType')}
                {': '}
                {courseDetails.type}
              </Tag>
            )
            : null}
          {courseDetails?.typicalSessionIndex == null
            ? null
            : (
              <Tag variant="sessionAvailable">
                {tCourseDetails('typicalSessionIndex', { value: courseDetails.typicalSessionIndex })}
              </Tag>
            )}
        </div>

        <Link
          href={getETSCourseDetailsHref(course.code)}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tCourseDetails('visitCourseSite')}
          <ExternalLink className="size-4" />
        </Link>
      </div>
    </>
  );
};

type CourseContentSectionsProps = {
  course: DisplayCourse | null;
  courseDetails: DetailedProgramCourseDto | null;
  basicCourse: BasicCourseDto | null;
  tCourseDetails: TranslationFn;
};

const CourseContentSections = ({
  course,
  courseDetails,
  basicCourse,
  tCourseDetails,
}: CourseContentSectionsProps) => {
  if (!course) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="grid gap-6">
        <PageSection title={tCourseDetails('description')}>
          <p className="whitespace-pre-line text-sm leading-7">
            {course.description || tCourseDetails('missingDescription')}
          </p>
        </PageSection>
      </div>

      {courseDetails
        ? (
          <div className="grid gap-6">
            <PageSection title={tCourseDetails('prerequisites')}>
              <PrerequisitesSection courseDetails={courseDetails} />
            </PageSection>
          </div>
        )
        : null}

      <div className="grid gap-6 lg:col-span-2">
        <PageSection title={tCourseDetails('courseOffering')}>
          <OfferingsSection
            courseOfferings={courseDetails?.course.courseInstances}
            sessionAvailability={courseDetails ? undefined : basicCourse?.sessionAvailability}
          />
        </PageSection>
      </div>
    </div>
  );
};

const CourseDetailsPage = () => {
  const params = useParams<{ courseId?: string }>();
  const tCourseDetails = useTranslations('CourseDetailsPage');
  const tCommons = useTranslations('Commons');

  const rawCourseId = params.courseId;
  const courseId = parsePositiveInteger(rawCourseId);
  const hasSelectedCourse = courseId !== null;
  const hasInvalidCourseParam = rawCourseId !== undefined && courseId === null;

  useInvalidCourseParamToast(
    rawCourseId,
    hasInvalidCourseParam,
    tCourseDetails as TranslationFn,
  );

  const {
    data: programs,
    error: programsError,
    loading: programsLoading,
  } = useProgramsListByCourseIdApi(courseId);

  const availablePrograms = programs ?? [];
  const hasPrograms = availablePrograms.length > 0;
  const { isProgramsLoading, showNoProgramsState, shouldRenderCourseSection } = getCourseDetailsProgramState({
    hasSelectedCourse,
    hasPrograms,
    hasLoadedPrograms: programs !== null,
    programsLoading,
    programsError,
  });
  const selectedProgramIds = useProgramStore((state) => state.getSelectedProgramIds());
  const selectedPlannerProgramId = selectedProgramIds.find((id) =>
    availablePrograms.some((program) => program.programId === id)) ?? null;
  const [selectedProgramId, setSelectedProgramId] = React.useState<number | null>(null);

  const activeProgramId = getActiveProgramId(
    selectedProgramId,
    availablePrograms,
    selectedPlannerProgramId,
  );

  const {
    data: fetchedCourseDetails,
    error: courseDetailsError,
    loading: courseDetailsLoading,
  } = useDetailedProgramCourseApi(courseId, activeProgramId);
  const courseDetails = fetchedCourseDetails?.courseId === courseId
    && fetchedCourseDetails.programId === activeProgramId
    ? fetchedCourseDetails
    : null;
  const {
    data: fetchedBasicCourse,
    loading: basicCourseLoading,
    error: basicCourseError,
  } = useCourseByIdApi(!isProgramsLoading && activeProgramId === null ? courseId : null);
  const basicCourse = activeProgramId === null && fetchedBasicCourse?.id === courseId
    ? fetchedBasicCourse
    : null;
  const displayCourse = courseDetails?.course ?? basicCourse;

  const handleProgramChange = (nextProgramId: string) => {
    setSelectedProgramId(Number.parseInt(nextProgramId, 10));
  };

  const courseHeaderDescription = getCourseHeaderDescription(
    {
      courseDetailsError: courseDetailsError ?? undefined,
      programsError: programsError ?? undefined,
      isProgramsLoading,
      courseDetailsLoading,
      activeProgramId,
    },
    tCourseDetails as TranslationFn,
  );

  const emptyState = getCourseDetailsEmptyState(
    {
      hasInvalidCourseParam,
      showNoProgramsState,
      rawCourseId: rawCourseId ?? undefined,
    },
    tCourseDetails as TranslationFn,
  );
  const { showEmptyState, showCourseSection } = getCourseDetailsVisibility({
    hasSelectedCourse,
    showNoProgramsState,
    shouldRenderCourseSection,
    hasBasicCourse: basicCourse !== null,
    basicCourseLoading,
  });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h1
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            data-testid="course-details-page-title"
          >
            {tCourseDetails('pageTitle')}
          </h1>
          <div className="w-full lg:max-w-md">
            <CourseSearchSelect
              key={courseId ?? 'course-search'}
              currentCourseId={courseId}
            />
          </div>
        </header>

        {showEmptyState
          ? (
            <section
              className={`rounded-lg border p-8 ${emptyState.sectionClassName}`}
              data-testid={emptyState.testId}
              role={emptyState.role}
            >
              <p className={`max-w-3xl text-base leading-7 sm:text-lg ${emptyState.textClassName}`}>
                {emptyState.description}
              </p>
            </section>
          )
          : null}

        {showCourseSection
          ? (
            <section className="overflow-hidden rounded-xl border border-border/70 bg-background/95 shadow-sm backdrop-blur-sm">
              <div className={cn('grid gap-0', hasPrograms && 'lg:grid-cols-[minmax(0,1fr)_320px]')}>
                <header className={cn('p-6', hasPrograms && 'border-b border-border/60 lg:border-b-0 lg:border-r')}>
                  <CourseHeaderContent
                    course={displayCourse}
                    courseDetails={courseDetails}
                    courseHeaderDescription={activeProgramId === null && !basicCourseError
                      ? tCourseDetails('loadingCourse')
                      : basicCourseError ?? courseHeaderDescription}
                    tCourseDetails={tCourseDetails as TranslationFn}
                    tCommons={tCommons as TranslationFn}
                  />
                </header>

                {hasPrograms
                  ? (
                    <ProgramSelector
                      availablePrograms={availablePrograms}
                      selectedProgramId={activeProgramId}
                      isLoading={isProgramsLoading}
                      error={programsError}
                      onProgramChange={handleProgramChange}
                    />
                  )
                  : null}
              </div>
            </section>
          )
          : null}

        <CourseContentSections
          course={displayCourse}
          courseDetails={courseDetails}
          basicCourse={basicCourse}
          tCourseDetails={tCourseDetails as TranslationFn}
        />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
