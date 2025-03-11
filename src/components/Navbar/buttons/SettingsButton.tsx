'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import BaseDialog from '../../dialogs/BaseDialog';
import LanguageSettings from '../../LanguageSettings';

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Commons');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        onClick={handleOpen}
        size="medium"
        aria-label="settings"
        data-testid="settings-toggle-button"
        style={{ textTransform: 'none' }}
      >
        {t('settings')}
      </Button>

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
