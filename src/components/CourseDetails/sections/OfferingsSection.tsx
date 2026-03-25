'use client';

import type {
  DetailedProgramCourseInstanceDto,
} from '@/api/types/program';
import { useTranslations } from 'next-intl';
import Tag from '@/components/atoms/Tag';
import { cn } from '@/shadcn/lib/utils';
import { buildFutureTimelineOfferings } from '@/utils/offeringsUtil';
import { getSeasonStyle } from '@/utils/seasonUtil';
import {
  generateSessionKey,
  getCurrentSession,
} from '@/utils/sessionUtil';

type OfferingsSectionProps = {
  courseOfferings: DetailedProgramCourseInstanceDto[];
};

const OfferingsSection = ({
  courseOfferings,
}: OfferingsSectionProps) => {
  const t = useTranslations('CourseDetailsPage');
  const currentSessionKey = generateSessionKey(new Date().getFullYear(), getCurrentSession());
  const timelineOfferings = buildFutureTimelineOfferings(courseOfferings);

  if (timelineOfferings.length === 0) {
    return <p className="text-sm text-muted-foreground">{t('noOfferings')}</p>;
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="scrollbar-thin w-full max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain">
        <ul className="flex w-max min-w-max snap-x snap-mandatory items-start px-1 py-3 touch-pan-x sm:px-2">
          {timelineOfferings.map((offering, index) => {
            const isLast = index === timelineOfferings.length - 1;
            const isCurrentSession = offering.sessionKey === currentSessionKey;
            const { SeasonIcon, color } = getSeasonStyle(offering.sessionTerm);

            return (
              <li
                key={offering.sessionKey}
                className="flex min-w-[10rem] max-w-[10rem] shrink-0 snap-start items-start pr-4 last:pr-4 sm:min-w-[11rem] sm:max-w-[11rem] sm:pr-5 sm:last:pr-5 lg:min-w-[12rem] lg:max-w-[12rem] lg:pr-6 lg:last:pr-6"
                data-testid={`course-offering-${offering.sessionKey}`}
              >
                <div className="flex w-16 shrink-0 flex-col items-center sm:w-[4.5rem]">
                  <div
                    className={cn(
                      'relative z-10 flex size-14 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-border/70 bg-background px-2 shadow-sm',
                      isCurrentSession && 'border-primary/60 ring-1 ring-primary/30',
                    )}
                  >
                    <div className="flex items-center justify-center">
                      {SeasonIcon
                        ? <SeasonIcon aria-hidden className={cn('size-5', color)} />
                        : null}
                    </div>
                    <p className="text-xs font-bold leading-none text-foreground sm:text-sm">
                      {offering.sessionAlias}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="flex min-h-7 w-full flex-col items-center gap-2">
                      {offering.availability.map((availability) => (
                        <Tag
                          key={`${offering.sessionKey}-${availability}`}
                          data-testid={`course-offering-${offering.sessionKey}-availability-${availability}`}
                          variant="info"
                        >
                          {availability}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>

                {isLast
                  ? null
                  : (
                    <div className="flex flex-1 items-start pt-7 pl-4">
                      <span
                        aria-hidden
                        className="h-px w-full bg-border/80"
                      />
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OfferingsSection;
