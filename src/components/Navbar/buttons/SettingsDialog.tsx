'use client';

import { Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import BaseDialog from '@/components/dialogs/BaseDialog';
import LanguageSelector from '@/components/settings/LanguageSelector';
import ThemeSelector from '@/components/settings/ThemeSelector';
import { Button } from '@/shadcn/ui/button';

type SettingsButtonProps = {
  onOpenSettingsAction: () => void;
  closeSheetAction?: () => void;
};

export function SettingsButton({ onOpenSettingsAction, closeSheetAction }: SettingsButtonProps) {
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
      onPointerDown={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
      aria-label="settings"
      data-testid="settings-toggle-button"
      style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
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

  return (
    <BaseDialog
      isOpen={isOpen}
      title={t('settings')}
      onClose={onCloseAction}
    >
      <div className="p-4 w-full">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            {t('language')}
          </h2>
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </div>

        <div className="mb-2">
          <h2 className="text-lg font-medium mb-2">
            {t('theme')}
          </h2>
          <div className="ml-2">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </BaseDialog>
  );
}
