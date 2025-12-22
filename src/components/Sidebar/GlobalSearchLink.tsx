'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/shadcn/ui/button';

type GlobalSearchLinkProps = {
  onClickAction: () => void;
  className?: string;
};

export default function GlobalSearchLink({ onClickAction, className }: GlobalSearchLinkProps) {
  const t = useTranslations('PlannerPage');

  return (
    <div className={`text-center ${className ?? ''}`} data-testid="global-search-link">
      <p className="text-sm text-muted-foreground">
        {t('didnt-find-course')}
        {' '}
        <Button
          type="button"
          variant="link"
          onClick={onClickAction}
          data-testid="global-search-button"
        >
          {t('search-all-programs')}
        </Button>
      </p>
    </div>
  );
}
