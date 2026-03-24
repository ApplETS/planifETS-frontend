'use client';

import type {
  DetailedProgramCourseInstanceDto,
  SessionAvailabilityDto,
} from '@/api/types/program';
import { useTranslations } from 'next-intl';
import Tag from '@/components/atoms/Tag';
import { cn } from '@/shadcn/lib/utils';
import { buildFutureTimelineOfferings } from '@/utils/offeringsUtils';
import { getSeasonStyle } from '@/utils/seasonUtils';
import {
  generateSessionKey,
  getCurrentSession,
} from '@/utils/sessionUtils';

type OfferingsSectionProps = {
  courseOfferings: DetailedProgramCourseInstanceDto[];
  sessionAvailability?: SessionAvailabilityDto[];
};

const EMPTY_SESSION_AVAILABILITY: SessionAvailabilityDto[] = [];

const OfferingsSection = ({
  courseOfferings,
  sessionAvailability,
}: OfferingsSectionProps) => {
  const t = useTranslations('CourseDetailsPage');
  const currentSessionKey = generateSessionKey(new Date().getFullYear(), getCurrentSession());
  const timelineOfferings = buildFutureTimelineOfferings(
    courseOfferings,
    sessionAvailability ?? EMPTY_SESSION_AVAILABILITY,
  );

  if (timelineOfferings.length === 0) {
    return <p className="text-sm text-muted-foreground">{t('noOfferings')}</p>;
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="scrollbar-thin w-full max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain pb-3">
        <div
          className="flex w-max min-w-max snap-x snap-mandatory items-start px-1 py-3 touch-pan-x sm:px-2"
          role="list"
        >
          {timelineOfferings.map((offering, index) => {
            const isLast = index === timelineOfferings.length - 1;
            const isCurrentSession = offering.sessionKey === currentSessionKey;
            const { SeasonIcon, color } = getSeasonStyle(offering.sessionTerm);

            return (
              <article
                key={offering.sessionKey}
                className="flex min-w-[10rem] max-w-[10rem] shrink-0 snap-start items-start pr-4 last:pr-4 sm:min-w-[11rem] sm:max-w-[11rem] sm:pr-5 sm:last:pr-5 lg:min-w-[12rem] lg:max-w-[12rem] lg:pr-6 lg:last:pr-6"
                role="listitem"
              >
                <div className="flex w-16 shrink-0 flex-col items-center sm:w-[4.5rem]">
                  <div
                    className={cn(
                      'relative z-10 flex size-14 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-border/70 bg-background px-2 shadow-sm',
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
                          variant="info"
                        >
                          {availability}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>

                {!isLast
                  ? (
                    <div className="flex flex-1 items-start pt-7 pl-4">
                      <span
                        aria-hidden
                        className="h-px w-full bg-border/80"
                      />
                    </div>
                  )
                  : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfferingsSection;
