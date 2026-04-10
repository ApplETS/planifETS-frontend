'use client';

import { Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shadcn/ui/button';

type PlannerExportButtonProps = {
  onBeforeExportAction?: () => void | Promise<void>;
};

export default function PlannerExportButton({
  onBeforeExportAction,
}: PlannerExportButtonProps) {
  const t = useTranslations('Commons');

  const handleClick = async () => {
    await onBeforeExportAction?.();
    globalThis.print();
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      data-testid="planner-export-button"
      data-print-hidden="true"
      className="w-full sm:w-auto"
    >
      <Printer className="size-4" />
      {t('export-data')}
    </Button>
  );
}
