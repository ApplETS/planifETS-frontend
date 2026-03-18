'use client';

import type { DetailedProgramCourseDto } from '@/api/types/program';
import { useTranslations } from 'next-intl';
import React from 'react';

import CourseActionsMenu from '@/components/Planner/CourseActionsMenu';
import { getCurrentSession } from '@/utils/sessionUtils';

type PrerequisitesSectionProps = {
  courseDetails: DetailedProgramCourseDto;
};

const PrerequisitesSection = ({ courseDetails }: PrerequisitesSectionProps) => {
  const t = useTranslations('CourseDetailsPage');

  const currentSessionTerm = getCurrentSession();
  const currentSessionYear = new Date().getFullYear();

  const prerequisites = React.useMemo(() => {
    const structured = courseDetails.prerequisites.map(({ prerequisite }) => ({
      id: prerequisite.course.id,
      code: prerequisite.course.code,
      title: prerequisite.course.title,
    }));

    if (!courseDetails.unstructuredPrerequisite) {
      return structured;
    }

    return [
      ...structured,
      {
        id: undefined,
        code: courseDetails.unstructuredPrerequisite,
        title: t('unstructuredPrerequisiteRule'),
      },
    ];
  }, [courseDetails.prerequisites, courseDetails.unstructuredPrerequisite, t]);

  return (
    <>
      {prerequisites.length === 0
        ? (
          <p className="text-sm text-muted-foreground">{t('noPrerequisites')}</p>
        )
        : (
          <div className="grid gap-3">
            {prerequisites.map((prerequisite) => (
              <div
                key={`${prerequisite.code}-${prerequisite.title}`}
                className="rounded-2xl border border-border/70 bg-muted/40 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{prerequisite.code}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{prerequisite.title}</p>
                  </div>

                  {prerequisite.id
                    ? (
                      <CourseActionsMenu
                        courseId={prerequisite.id}
                        courseCode={prerequisite.code}
                        fromSessionYear={currentSessionYear}
                        fromSessionTerm={currentSessionTerm}
                      />
                    )
                    : null}
                </div>
              </div>
            ))}
          </div>
        )}
    </>
  );
};

export default PrerequisitesSection;
