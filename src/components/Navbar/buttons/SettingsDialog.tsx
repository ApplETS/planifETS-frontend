'use client';

import { AlertTriangle, Settings2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import BaseDialog from '@/components/dialogs/BaseDialog';
import LanguageSelector from '@/components/settings/LanguageSelector';
import ThemeSelector from '@/components/settings/ThemeSelector';
import { resetStore } from '@/lib/persistConfig';
import { Button } from '@/shadcn/ui/button';

type SettingsButtonProps = {
  onOpenSettingsAction: () => void;
  closeSheetAction?: () => void;
};

export function SettingsButton({
  onOpenSettingsAction,
  closeSheetAction,
}: SettingsButtonProps) {
  const t = useTranslations('Commons');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Close the sheet first, then open settings
    if (closeSheetAction) {
      closeSheetAction();
    }
    // Small delay to let sheet close animation start
    setTimeout(() => {
      onOpenSettingsAction();
    }, 50);
  };

  return (
    <Button
      variant="outline"
      className="bg-background text-foreground border border-foreground"
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      aria-label="settings"
      data-testid="settings-toggle-button"
      style={{
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <Settings2 />
      {t('settings')}
    </Button>
  );
}

type SettingsDialogProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export function SettingsDialog({ isOpen, onCloseAction }: SettingsDialogProps) {
  const t = useTranslations('Commons');
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetData = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsResetting(true);
    try {
      await resetStore();
      // Reload the page to restart with fresh state
      window.location.reload();
    } catch (error) {
      console.error('Failed to reset data:', error);
      setIsResetting(false);
      setShowConfirm(false);
    }
  };

  const handleCancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <BaseDialog isOpen={isOpen} title={t('settings')} onClose={onCloseAction}>
      <div className="p-4 w-full">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">{t('language')}</h2>
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">{t('theme')}</h2>
          <div className="ml-2">
            <ThemeSelector />
          </div>
        </div>

        <div className="mb-2 border-t pt-6">
          <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            {t('reset-data')}
          </h2>
          <p className="text-sm text-muted-foreground mb-3 ml-2">
            {t('reset-data-description')}
          </p>
          {showConfirm && (
            <div className="mb-3 ml-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-sm text-destructive">{t('reset-data-warning')}</p>
            </div>
          )}
          <div className="ml-2 flex gap-2">
            {showConfirm
              ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={handleResetData}
                    disabled={isResetting}
                  >
                    {isResetting ? t('resetting') : t('confirm-reset')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelReset}
                    disabled={isResetting}
                  >
                    {t('cancel')}
                  </Button>
                </>
              )
              : (
                <Button variant="destructive" onClick={handleResetData}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('reset-data')}
                </Button>
              )}
          </div>
        </div>
      </div>
    </BaseDialog>
  );
}
