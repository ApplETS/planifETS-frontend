'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

type CreditsBadgeProps = {
  credits: number;
  dataTestId: string;
};

const CreditsBadge: FC<CreditsBadgeProps> = ({ credits, dataTestId }) => {
  const t = useTranslations('Commons');

  return (
    <span
      className="rounded-[5px] border bg-creditsTag px-1 py-0.5 text-xs text-black"
      data-testid={dataTestId}
    >
      {credits}
      {' '}
      {t('credits')}
    </span>
  );
};

export default CreditsBadge;
