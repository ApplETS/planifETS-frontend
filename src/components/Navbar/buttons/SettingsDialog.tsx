'use client';

import { Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import BaseDialog from '@/components/dialogs/BaseDialog';
import LanguageSelector from '@/components/settings/LanguageSelector';
import ThemeSelector from '@/components/settings/ThemeSelector';
import { Button } from '@/shadcn/ui/button';

export default function SettingsDialog({ closeSheetAction }: { closeSheetAction?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Commons');

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    if (closeSheetAction) {
      closeSheetAction();
    }
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="outline"
        className="bg-background text-foreground border border-foreground"
        onClick={handleOpen}
        aria-label="settings"
        data-testid="settings-toggle-button"
        style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <Settings2 />
        {t('settings')}
      </Button>

      <BaseDialog
        isOpen={isOpen}
        title={t('settings')}
        onClose={handleClose}
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
    </>
  );
}
