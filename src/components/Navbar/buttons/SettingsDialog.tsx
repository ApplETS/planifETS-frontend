'use client';

import { Settings2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import BaseDialog from '@/components/dialogs/BaseDialog';
import LanguageSelector from '@/components/settings/LanguageSelector';
import ThemeSelector from '@/components/settings/ThemeSelector';
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
  onOpenResetAction?: () => void;
};

export function SettingsDialog({
  isOpen,
  onCloseAction,
  onOpenResetAction,
}: SettingsDialogProps) {
  const t = useTranslations('Commons');
  const openConfirm = () => {
    // Close settings first, then open the reset dialog mounted at a higher level
    onCloseAction();
    setTimeout(() => {
      // call opener passed from parent (Navbar)
      onOpenResetAction?.();
    }, 50);
  };

  return (
    <>
      <BaseDialog
        isOpen={isOpen}
        title={t('settings')}
        description={t('settings')}
        hideDescription={true}
        onClose={onCloseAction}
      >
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
              {t('reset-data')}
            </h2>
            <p className="text-sm text-muted-foreground mb-3 ml-2">
              {t('reset-data-description')}
            </p>

            <div className="ml-2 flex gap-2">
              <Button variant="destructive" onClick={openConfirm}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('reset-data')}
              </Button>
            </div>
          </div>
        </div>
      </BaseDialog>
    </>
  );
}
