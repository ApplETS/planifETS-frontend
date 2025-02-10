'use client';

import type { FC } from 'react';
import * as React from 'react';

type CreditsBadgeProps = {
  credits: number;
  testId?: string;
};

const CreditsBadge: FC<CreditsBadgeProps> = ({ credits, testId }) => (
  <span
    className="rounded-[5px] border bg-creditsTag px-1 py-0.5 text-xs text-black"
    data-testid={testId}
  >
    {credits}
    {' '}
    crédits
  </span>
);

export default CreditsBadge;
