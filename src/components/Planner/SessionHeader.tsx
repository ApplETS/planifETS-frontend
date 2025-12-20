import type { FC } from 'react';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/ui/tooltip';

import { getSeasonStyle } from '@/utils/seasonUtils';
import { getTranslationKey } from '@/utils/sessionUtils';
import CreditsTag from '../atoms/CreditsTag';

type SessionHeaderProps = {
  sessionTerm: string;
  sessionYear: number;
  totalCredits: number;
  isNoAvailabilityData: boolean;
  isCurrentSession?: boolean;
};

const SessionHeader: FC<SessionHeaderProps> = ({
  sessionTerm,
  sessionYear,
  totalCredits,
  isNoAvailabilityData,
  isCurrentSession = false,
}) => {
  const t = useTranslations('PlannerPage');

  const translatedSessionTerm = t(getTranslationKey(sessionTerm));
  const { SeasonIcon, color } = getSeasonStyle(sessionTerm) ?? {};

  return (
    <div className="mb-2 flex select-none flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1">
        <SeasonIcon className={color} />
        <h3 className="text-lg font-bold">
          {translatedSessionTerm}
          {' '}
          {sessionYear}
        </h3>
        {isCurrentSession && (
          <div className="ml-2 size-2 rounded-full bg-green-500 animate-pulse" />
        )}
        {isNoAvailabilityData && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group relative cursor-pointer" aria-label={t('information-course-availability')}>
                  <Info className="text-amber-400 hover:text-amber-400/70 size-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="text-base max-w-xs">
                {t('courses-availability-not-yet-published')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <CreditsTag
        credits={totalCredits}
        data-testid={`session-${sessionTerm}-${sessionYear}-credits`}
      />
    </div>
  );
};

export default SessionHeader;
