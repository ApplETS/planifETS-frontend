import type { FC } from 'react';
import { getTranslationKey } from '@/utils/sessionUtils';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { getSeasonStyle } from '../../utils/seasonUtils';
import CreditsBadge from '../atoms/CreditsBadge';

type SessionHeaderProps = {
  sessionTerm: string;
  sessionYear: number;
  totalCredits: number;
  isNoAvailabilityData: boolean;
};

const SessionHeader: FC<SessionHeaderProps> = ({
  sessionTerm,
  sessionYear,
  totalCredits,
  isNoAvailabilityData,
}) => {
  const t = useTranslations('PlannerPage');

  const translatedSessionTerm = t(getTranslationKey(sessionTerm));
  const { SeasonIcon, color } = getSeasonStyle(sessionTerm) ?? {};

  return (
    <div className="mb-2 flex select-none flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <SeasonIcon className={color} />
        <h3 className="text-lg font-bold">
          {translatedSessionTerm}
          {' '}
          {sessionYear}
        </h3>
        {isNoAvailabilityData && (
          <Tooltip
            title={(
              <p className="text-base">
                {t('courses-availability-not-yet-published')}
              </p>
            )}
            arrow
          >
            <div className="group relative" aria-label={t('information-course-availability')}>
              <FaInfoCircle className="text-amber-400 hover:text-orange-600" />
            </div>
          </Tooltip>
        )}
      </div>
      <div className="flex w-auto justify-end sm:mt-0">
        <CreditsBadge
          credits={totalCredits}
          dataTestId={`session-${sessionTerm}-${sessionYear}-credits`}
        />
      </div>
    </div>
  );
};

export default SessionHeader;
