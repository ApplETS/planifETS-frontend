'use client';

import type { DetailedProgramCourseDto } from '@/api/types/program';
import { useTranslations } from 'next-intl';

import CourseActionsMenu from '@/components/Planner/CourseActionsMenu';
import { getCurrentSession } from '@/utils/sessionUtils';

type PrerequisitesSectionProps = {
  courseDetails: DetailedProgramCourseDto;
};

const PrerequisitesSection = ({ courseDetails }: PrerequisitesSectionProps) => {
  const t = useTranslations('CourseDetailsPage');

  const currentSessionTerm = getCurrentSession();
  const currentSessionYear = new Date().getFullYear();
  const structuredPrerequisites = courseDetails.prerequisites.map(({ prerequisite }) => ({
    id: prerequisite.course.id,
    code: prerequisite.course.code,
    title: prerequisite.course.title,
  }));
  const unstructuredPrerequisite = courseDetails.unstructuredPrerequisite?.trim() || null;
  const hasPrerequisites = structuredPrerequisites.length > 0 || unstructuredPrerequisite !== null;

  return (
    <>
      {hasPrerequisites
        ? (
          <div className="grid gap-3">
            {structuredPrerequisites.length > 0
              ? (
                <div className="grid gap-2">
                  {structuredPrerequisites.map((prerequisite) => (
                    <div
                      key={`${prerequisite.code}-${prerequisite.title}`}
                      className="rounded-2xl border border-border/70 bg-muted/40 p-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{prerequisite.code}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{prerequisite.title}</p>
                        </div>

                        <CourseActionsMenu
                          courseId={prerequisite.id}
                          courseCode={prerequisite.code}
                          fromSessionYear={currentSessionYear}
                          fromSessionTerm={currentSessionTerm}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )
              : null}

            {unstructuredPrerequisite
              ? (
                <div className="px-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {t('unstructuredPrerequisiteRule')}
                  </p>
                  <p
                    className="mt-0.5 text-sm leading-6 text-foreground"
                    data-testid="course-details-unstructured-prerequisite"
                  >
                    {unstructuredPrerequisite}
                  </p>
                </div>
              )
              : null}
          </div>
        )
        : (
          <p className="text-sm text-muted-foreground">{t('noPrerequisites')}</p>
        )}
    </>
  );
};

export default PrerequisitesSection;
