'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import BaseButton from '@/components/atoms/buttons/BaseButton';
import ThemeSelector from '@/components/settings/ThemeSelector';
import BaseDialog from '../../dialogs/BaseDialog';
import LanguageSettings from '../../settings/LanguageSettings';

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Commons');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <BaseButton
        variant="outlined"
        startIcon={<SettingsIcon />}
        onClick={handleOpen}
        size="md"
        aria-label="settings"
        data-testid="settings-toggle-button"
        style={{ textTransform: 'none' }}
      >
        {t('settings')}
      </BaseButton>

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
              <LanguageSettings />
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
