'use client';

import type { FC } from 'react';
import * as React from 'react';

type CreditsBadgeProps = {
  credits: number;
  dataTestId: string;
};

const CreditsBadge: FC<CreditsBadgeProps> = ({ credits, dataTestId }) => (
  <span
    className="rounded-[5px] border bg-creditsTag px-1 py-0.5 text-xs text-black"
    data-testid={dataTestId}
  >
    {credits}
    {' '}
    crédits
  </span>
);

export default CreditsBadge;
