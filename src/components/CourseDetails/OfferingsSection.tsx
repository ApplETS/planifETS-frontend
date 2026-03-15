'use client';

import type { DetailedProgramCourseInstanceDto } from '@/api/types/program';
import { useTranslations } from 'next-intl';
import Tag from '@/components/atoms/Tag';
import { formatCourseAvailability } from '@/utils/courseUtils';
import { getTranslationKey, sortOfferingsBySession, trimesterToSessionTerm } from '@/utils/sessionUtils';

type OfferingsSectionProps = {
  courseOfferings: DetailedProgramCourseInstanceDto[];
};
const OfferingsSection = ({
  courseOfferings,
}: OfferingsSectionProps) => {
  const t = useTranslations('CourseDetailsPage');
  const tPlanner = useTranslations('PlannerPage');

  if (courseOfferings.length === 0) {
    return <p className="text-sm text-muted-foreground">{t('noOfferings')}</p>;
  }

  const sortedOfferings = sortOfferingsBySession(courseOfferings);

  return (
    <div className="grid gap-3">
      {sortedOfferings.map((instance) => {
        const availabilityLabel = formatCourseAvailability(instance.availability);
        const sessionTerm = trimesterToSessionTerm(instance.sessionTrimester);
        const sessionTranslationKey = sessionTerm ? getTranslationKey(sessionTerm) : null;
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
                  <Tag variant="primary">{availabilityLabel}</Tag>
                )
                : (
                  <Tag variant="warning">{t('notAvailable')}</Tag>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsSection;
