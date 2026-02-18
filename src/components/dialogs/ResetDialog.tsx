'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import BaseDialog from '@/components/dialogs/BaseDialog';
import { resetStore } from '@/lib/persistConfig';
import { Button } from '@/shadcn/ui/button';

type ResetDialogProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export default function ResetDialog({ isOpen, onCloseAction }: ResetDialogProps) {
  const t = useTranslations('Commons');
  const [isResetting, setIsResetting] = useState(false);

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      await resetStore();
      window.location.reload();
    } catch (err) {
      console.error('Failed to reset data:', err);
      setIsResetting(false);
    }
  };

  const footerActions = (
    <>
      <Button variant="destructive" onClick={handleConfirmReset} disabled={isResetting}>
        {isResetting ? t('resetting') : t('confirm-reset')}
      </Button>
    </>
  );

  return (
    <BaseDialog
      isOpen={isOpen}
      title={t('confirm-reset')}
      description={t('reset-data-description')}
      hideHeader={true}
      onClose={onCloseAction}
      footerActions={footerActions}
    >
      <div className="w-full">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="rounded-full dark:bg-destructive p-2 flex items-center justify-center w-10 h-10 dark:ring-destructive/60 bg-primary/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('confirm-reset')}
            </h3>
            <p className="text-sm text-muted-foreground">{t('reset-data-description')}</p>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
}
