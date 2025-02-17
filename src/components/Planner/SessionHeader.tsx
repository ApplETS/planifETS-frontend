import type { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import { getSeason } from '../../utils/seasonUtils';
import CreditsBadge from '../atoms/CreditsBadge';

type SessionHeaderProps = {
  sessionName: string;
  sessionYear: number;
  totalCredits: number;
  isNoAvailabilityData: boolean;
};

const SessionHeader: FC<SessionHeaderProps> = ({
  sessionName,
  sessionYear,
  totalCredits,
  isNoAvailabilityData,
}) => {
  const { SeasonIcon, color } = getSeason(sessionName) || {};

  return (
    <div className="mb-2 flex select-none flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <SeasonIcon className={color} />
        <h3 className="text-lg font-bold">
          {sessionName}
          {' '}
          {sessionYear}
        </h3>
        {isNoAvailabilityData && (
          <Tooltip
            title={(
              <p className="text-base">
                Les informations sur la disponibilité des cours pour cette session ne sont
                pas encore publiées par l&apos;école.
              </p>
            )}
            arrow
          >
            <div className="group relative" aria-label="Information about course availability">
              <FaInfoCircle className="text-amber-400 hover:text-orange-600" />
            </div>
          </Tooltip>
        )}
      </div>
      <div className="flex w-auto justify-end sm:mt-0">
        <CreditsBadge
          credits={totalCredits}
          testId={`session-${sessionName}-${sessionYear}-credits`}
        />
      </div>
    </div>
  );
};

export default SessionHeader;
