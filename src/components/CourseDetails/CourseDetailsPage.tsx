'use client';

import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { useDetailedProgramCourseApi } from '@/api/hooks/useDetailedProgramCourseApi';
import { useProgramsListByCourseIdApi } from '@/api/hooks/useProgramsListByCourseIdApi';
import Tag from '@/components/atoms/Tag';
import OfferingsSection from '@/components/CourseDetails/OfferingsSection';
import PageSection from '@/components/CourseDetails/PageSection';
import PrerequisitesSection from '@/components/CourseDetails/PrerequisitesSection';
import ProgramSelector from '@/components/CourseDetails/ProgramSelector';
import { Button } from '@/shadcn/ui/button';
import { useProgramStore } from '@/store/programStore';
import { getCourseDetailsHref } from '@/utils/courseDetailsUtils';
import { parsePositiveInteger } from '@/utils/numberUtil';

const STATE_BLOCK_STYLES = 'rounded-2xl border p-5 text-sm';

const CourseDetailsPage = () => {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('CourseDetailsPage');
  const tCommon = useTranslations('Commons');

  const [isRouteChangePending, startRouteChange] = React.useTransition();

  const courseId = React.useMemo(
    () => parsePositiveInteger(params.courseId),
    [params.courseId],
  );
  const routeProgramId = React.useMemo(
    () => parsePositiveInteger(searchParams.get('programId')),
    [searchParams],
  );

  const {
    data: programs,
    error: programsError,
    loading: programsLoading,
  } = useProgramsListByCourseIdApi(courseId);

  const availablePrograms = React.useMemo(() => programs ?? [], [programs]);
  const selectedProgramIds = useProgramStore((state) => state.getSelectedProgramIds());

  const selectedProgramId = React.useMemo(() => {
    // Prefer explicit programId from the route if it's valid
    if (routeProgramId) {
      const hasRouteProgram = availablePrograms.some((program) => program.programId === routeProgramId);
      if (hasRouteProgram) {
        return routeProgramId;
      }
    }

    // If the route doesn't specify a valid program, fall back to the user's previously selected program(s)
    return selectedProgramIds.find((id) => availablePrograms.some((program) => program.programId === id)) ?? null;
  }, [availablePrograms, routeProgramId, selectedProgramIds]);

  const programIdForDetails = selectedProgramId;

  const {
    data: courseDetails,
    error: courseDetailsError,
    loading: courseDetailsLoading,
  } = useDetailedProgramCourseApi(courseId, programIdForDetails);
  const courseOfferings = React.useMemo(
    () => (courseDetails
      ? courseDetails.course.courseInstances
      : []),
    [courseDetails],
  );

  const handleProgramChange = (nextProgramId: string) => {
    if (!courseId) {
      return;
    }

    startRouteChange(() => {
      router.replace(
        getCourseDetailsHref(courseId, Number.parseInt(nextProgramId, 10)),
        { scroll: false },
      );
    });
  };

  if (!courseId) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center px-4 py-10">
        <div className={`${STATE_BLOCK_STYLES} w-full border-destructive/25 bg-destructive/5 text-destructive`}>
          {t('invalidCourse')}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="lg">
            <Link href="/planner">
              <ArrowLeft />
              {t('backToPlanner')}
            </Link>
          </Button>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-background/95 shadow-sm backdrop-blur-sm">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
              {courseDetails
                ? (
                  <>
                    <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      {courseDetails.course.code}
                    </h1>
                    <p className="mt-3 max-w-3xl text-lg">
                      {courseDetails.course.title}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <Tag variant="credits">
                          {courseDetails.course.credits}
                          {' '}
                          {tCommon('credits')}
                        </Tag>
                        <Tag variant="sessionAvailable">
                          {t('cycle')}
                          {' '}
                          {courseDetails.course.cycle}
                        </Tag>
                        {courseDetails.type
                          ? (
                            <Tag variant="sessionAvailable">
                              {t('requirementType')}
                              {': '}
                              {courseDetails.type}
                            </Tag>
                          )
                          : null}
                        {courseDetails.typicalSessionIndex !== null
                          ? (
                            <Tag variant="sessionAvailable">
                              {t('typicalSessionIndex', { value: courseDetails.typicalSessionIndex })}
                            </Tag>
                          )
                          : null}
                      </div>

                      <Link
                        href={`https://www.etsmtl.ca/etudes/cours/${(courseDetails.course.code)}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('visitCourseSite')}
                        <ExternalLink className="size-4" />
                      </Link>
                    </div>
                  </>
                )
                : (
                  <>
                    <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      {t('pageTitle')}
                    </h1>
                    <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                      {t('pageDescription')}
                    </p>
                  </>
                )}
            </div>

            <ProgramSelector
              availablePrograms={availablePrograms}
              selectedProgramId={selectedProgramId}
              isLoading={programsLoading}
              isRouteChangePending={isRouteChangePending}
              error={programsError}
              onProgramChange={handleProgramChange}
            />
          </div>
        </section>

        {courseDetailsLoading
          ? (
            <div className={`${STATE_BLOCK_STYLES} border-border/70 bg-background/95 text-muted-foreground`}>
              {t('loadingCourse')}
            </div>
          )
          : null}

        {!courseDetailsLoading && !courseDetailsError && courseDetails
          ? (
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="grid gap-6">
                <PageSection title={t('description')}>
                  <p className="text-sm leading-7">
                    {courseDetails.course.description || t('missingDescription')}
                  </p>
                </PageSection>
              </div>

              <div className="grid gap-6">
                <PageSection title={t('prerequisites')}>
                  <PrerequisitesSection courseDetails={courseDetails} />
                </PageSection>
              </div>

              <div className="grid gap-6 lg:col-span-2">
                <PageSection title={t('courseOffering')}>
                  <OfferingsSection courseOfferings={courseOfferings} />
                </PageSection>
              </div>
            </div>
          )
          : null}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
