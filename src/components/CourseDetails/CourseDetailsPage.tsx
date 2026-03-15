'use client';

import type { DetailedProgramCourseDto } from '@/api/types/program';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { useDetailedProgramCourseApi } from '@/api/hooks/useDetailedProgramCourseApi';
import { useProgramsListByCourseIdApi } from '@/api/hooks/useProgramsListByCourseIdApi';
import Tag from '@/components/atoms/Tag';
import { Button } from '@/shadcn/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/ui/select';
import { getCourseDetailsHref } from '@/utils/courseDetailsUtils';
import {
  formatCourseAvailability,
} from '@/utils/courseUtils';
import { parsePositiveInteger } from '@/utils/numberUtil';
import { getTranslationKey, trimesterToSessionTerm } from '@/utils/sessionUtils';

type PageSectionProps = {
  title: string;
  children: React.ReactNode;
};

const PageSection = ({ title, children }: PageSectionProps) => (
  <section className="rounded-3xl border border-border/70 bg-background/95 p-4 shadow-sm backdrop-blur-sm">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const STATE_BLOCK_STYLES = 'rounded-2xl border p-5 text-sm';
const renderStructuredPrerequisites = (
  courseDetails: DetailedProgramCourseDto,
  noPrerequisitesText: string,
) => {
  const prerequisites = courseDetails.prerequisites.map(({ prerequisite }) => prerequisite.course);

  if (prerequisites.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {noPrerequisitesText}
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {prerequisites.map((prerequisite) => (
        <div
          key={prerequisite.code}
          className="rounded-2xl border border-border/70 bg-muted/40 p-4"
        >
          <p className="font-semibold text-foreground">{prerequisite.code}</p>
          <p className="mt-1 text-sm text-muted-foreground">{prerequisite.title}</p>
        </div>
      ))}
    </div>
  );
};

const CourseDetailsPage = () => {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('CourseDetailsPage');
  const tCommon = useTranslations('Commons');
  const tPlanner = useTranslations('PlannerPage');
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

  const availablePrograms = React.useMemo(
    () => programs ?? [],
    [programs],
  );

  const selectedProgram = React.useMemo(() => {
    if (!routeProgramId) {
      return null;
    }

    return availablePrograms.find((program) => program.programId === routeProgramId) ?? null;
  }, [availablePrograms, routeProgramId]);

  const selectedProgramId = selectedProgram?.programId ?? null;

  const {
    data: courseDetails,
    error: courseDetailsError,
    loading: courseDetailsLoading,
  } = useDetailedProgramCourseApi(courseId, selectedProgramId);
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

            <div className="bg-muted/30 p-6">
              <p className="text-sm font-medium text-foreground">{t('selectProgramLabel')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('selectProgramHelp')}</p>

              <div className="mt-4">
                <Select
                  value={selectedProgramId?.toString() ?? ''}
                  onValueChange={handleProgramChange}
                  disabled={programsLoading || isRouteChangePending || availablePrograms.length === 0}
                >
                  <SelectTrigger className="w-full" aria-label={t('selectProgramLabel')}>
                    <SelectValue placeholder={programsLoading ? t('loadingPrograms') : t('selectProgramPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePrograms.map((program) => (
                      <SelectItem key={program.programId} value={program.programId.toString()}>
                        {program.programCode}
                        {' - '}
                        {program.programTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {programsError
                ? (
                  <div className={`${STATE_BLOCK_STYLES} mt-4 border-destructive/20 bg-destructive/5 text-destructive`}>
                    {programsError}
                  </div>
                )
                : null}

              {!programsLoading && availablePrograms.length === 0 && !programsError
                ? (
                  <div className={`${STATE_BLOCK_STYLES} mt-4 border-border/70 bg-background text-muted-foreground`}>
                    {t('noPrograms')}
                  </div>
                )
                : null}
            </div>
          </div>
        </section>

        {courseDetailsLoading
          ? (
            <div className={`${STATE_BLOCK_STYLES} border-border/70 bg-background/95 text-muted-foreground`}>
              {t('loadingCourse')}
            </div>
          )
          : null}

        {courseDetailsError
          ? (
            <div className={`${STATE_BLOCK_STYLES} border-destructive/20 bg-destructive/5 text-destructive`}>
              {courseDetailsError}
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
                  {renderStructuredPrerequisites(courseDetails, t('noPrerequisites'))}

                  {courseDetails.unstructuredPrerequisite
                    ? (
                      <div className="mt-4 rounded-2xl border border-border/70 bg-muted/40 p-4">
                        <p className="text-sm font-medium text-foreground">
                          {t('additionalPrerequisiteRule')}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {courseDetails.unstructuredPrerequisite}
                        </p>
                      </div>
                    )
                    : null}
                </PageSection>
              </div>

              <div className="grid gap-6 lg:col-span-2">
                <PageSection title={t('courseOffering')}>
                  {courseOfferings.length === 0
                    ? (
                      <p className="text-sm text-muted-foreground">{t('noOfferings')}</p>
                    )
                    : (
                      <div className="grid gap-3">
                        {courseOfferings.map((instance) => {
                          const availabilityLabel = formatCourseAvailability(instance.availability);
                          const sessionTerm = trimesterToSessionTerm(instance.sessionTrimester);
                          const sessionTranslationKey = sessionTerm
                            ? getTranslationKey(sessionTerm)
                            : null;
                          const sessionLabel = sessionTranslationKey
                            ? tPlanner(sessionTranslationKey)
                            : instance.sessionTrimester;

                          return (
                            <div
                              key={`${instance.sessionTrimester}-${instance.sessionYear}`}
                              className="rounded-2xl border border-border/70 bg-muted/40 p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-semibold text-foreground">
                                    {sessionLabel}
                                    {' '}
                                    {instance.sessionYear}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {availabilityLabel
                                  ? (
                                    <Tag variant="info">{availabilityLabel}</Tag>
                                  )
                                  : (
                                    <Tag variant="warning">{t('notAvailable')}</Tag>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
