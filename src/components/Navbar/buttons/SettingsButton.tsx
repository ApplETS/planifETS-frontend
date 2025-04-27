'use client';

import BaseButton from '@/components/atoms/buttons/BaseButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
        <LanguageSettings onClose={handleClose} />
      </BaseDialog>
    </>
  );
}
