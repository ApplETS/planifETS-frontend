'use client';

import { Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ThemeSelector from '@/components/settings/ThemeSelector';
import { Button } from '@/shadcn/ui/button';
import BaseDialog from '../../dialogs/BaseDialog';
import LanguageSelector from '../../settings/LanguageSelector';

export default function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Commons');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="outline"
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
