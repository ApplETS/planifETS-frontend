'use client';

import type { DetailedProgramCourseDto } from '@/api/types/program';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { useDetailedProgramCourseApi } from '@/api/hooks/useDetailedProgramCourseApi';
import { useProgramsListByCourseIdApi } from '@/api/hooks/useProgramsListByCourseIdApi';
import Tag from '@/components/atoms/Tag';
import ProgramSelector from '@/components/CourseDetails/ProgramSelector';
import OfferingsSection from '@/components/CourseDetails/sections/OfferingsSection';
import PageSection from '@/components/CourseDetails/sections/PageSection';
import PrerequisitesSection from '@/components/CourseDetails/sections/PrerequisitesSection';
import { showError } from '@/lib/toast';
import { useProgramStore } from '@/store/programStore';
import {
  getActiveProgramId,
  getCourseDetailsEmptyState,
  getCourseHeaderDescription,
} from '@/utils/courseDetailsUtil';
import { parsePositiveInteger } from '@/utils/numberUtil';
import { getETSCourseDetailsHref } from '@/utils/routesUtil';
import CourseSearchSelect from './CourseSearchSelect';

type TranslationFn = (key: string, values?: Record<string, unknown>) => string;

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
  courseDetails: DetailedProgramCourseDto | null;
  courseHeaderDescription: string;
  tCourseDetails: TranslationFn;
  tCommons: TranslationFn;
};

const CourseHeaderContent = ({
  courseDetails,
  courseHeaderDescription,
  tCourseDetails,
  tCommons,
}: CourseHeaderContentProps) => {
  if (!courseDetails) {
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
        {courseDetails.course.code}
      </h2>
      <p
        className="mt-1 max-w-3xl text-lg leading-tight text-foreground"
        data-testid="course-details-title"
      >
        {courseDetails.course.title}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Tag variant="credits">
            {courseDetails.course.credits}
            {' '}
            {tCommons('credits')}
          </Tag>
          <Tag variant="sessionAvailable">
            {tCourseDetails('cycle')}
            {' '}
            {courseDetails.course.cycle}
          </Tag>
          {courseDetails.type
            ? (
              <Tag variant="sessionAvailable">
                {tCourseDetails('requirementType')}
                {': '}
                {courseDetails.type}
              </Tag>
            )
            : null}
          {courseDetails.typicalSessionIndex == null
            ? null
            : (
              <Tag variant="sessionAvailable">
                {tCourseDetails('typicalSessionIndex', { value: courseDetails.typicalSessionIndex })}
              </Tag>
            )}
        </div>

        <Link
          href={getETSCourseDetailsHref(courseDetails.course.code)}
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
  courseDetails: DetailedProgramCourseDto | null;
  courseDetailsError: unknown;
  courseDetailsLoading: boolean;
  tCourseDetails: TranslationFn;
};

const CourseContentSections = ({
  courseDetails,
  courseDetailsError,
  courseDetailsLoading,
  tCourseDetails,
}: CourseContentSectionsProps) => {
  if (courseDetailsLoading || courseDetailsError || !courseDetails) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="grid gap-6">
        <PageSection title={tCourseDetails('description')}>
          <p className="text-sm leading-7">
            {courseDetails.course.description || tCourseDetails('missingDescription')}
          </p>
        </PageSection>
      </div>

      <div className="grid gap-6">
        <PageSection title={tCourseDetails('prerequisites')}>
          <PrerequisitesSection courseDetails={courseDetails} />
        </PageSection>
      </div>

      <div className="grid gap-6 lg:col-span-2">
        <PageSection title={tCourseDetails('courseOffering')}>
          <OfferingsSection courseOfferings={courseDetails.course.courseInstances} />
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
  const isProgramsLoading = programsLoading || (hasSelectedCourse && programs === null && !programsError);
  const hasPrograms = availablePrograms.length > 0;
  const showNoProgramsState = hasSelectedCourse && !isProgramsLoading && !programsError && !hasPrograms;
  const shouldRenderCourseSection = hasSelectedCourse && !isProgramsLoading && !showNoProgramsState;
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
    data: courseDetails,
    error: courseDetailsError,
    loading: courseDetailsLoading,
  } = useDetailedProgramCourseApi(courseId, activeProgramId);

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
  const showEmptyState = !hasSelectedCourse || showNoProgramsState;

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

        {shouldRenderCourseSection
          ? (
            <section className="overflow-hidden rounded-xl border border-border/70 bg-background/95 shadow-sm backdrop-blur-sm">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
                <header className="border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
                  <CourseHeaderContent
                    courseDetails={courseDetails}
                    courseHeaderDescription={courseHeaderDescription}
                    tCourseDetails={tCourseDetails as TranslationFn}
                    tCommons={tCommons as TranslationFn}
                  />
                </header>

                <ProgramSelector
                  availablePrograms={availablePrograms}
                  selectedProgramId={activeProgramId}
                  isLoading={isProgramsLoading}
                  error={programsError}
                  onProgramChange={handleProgramChange}
                />
              </div>
            </section>
          )
          : null}

        <CourseContentSections
          courseDetails={courseDetails}
          courseDetailsError={courseDetailsError}
          courseDetailsLoading={courseDetailsLoading}
          tCourseDetails={tCourseDetails as TranslationFn}
        />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
