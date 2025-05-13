'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';

type CreditsBadgeProps = {
  credits: number;
  dataTestId: string;
};

const CreditsBadge: FC<CreditsBadgeProps> = ({ credits, dataTestId }) => {
  const t = useTranslations('Commons');

  return (
    <span
      className="rounded-[5px] border bg-primary-foreground px-1 py-0.5 text-xs text-foreground"
      data-testid={dataTestId}
    >
      {credits}
      {' '}
      {t('credits')}
    </span>
  );
};

export default CreditsBadge;
