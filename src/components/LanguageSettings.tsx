import { setUserLocale } from '@/services/locale';
import { Button } from '@mui/material';
import React from 'react';

type LanguageSettingsProps = {
  onClose: () => void;
};

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ onClose }) => {
  const handleLocaleChange = async (locale: 'en' | 'fr') => {
    await setUserLocale(locale);
    onClose();
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="mb-2 text-lg font-semibold text-textDarkBackground">Change Language</h2>
      <div className="flex justify-between">
        <Button
          onClick={() => handleLocaleChange('en')}
          color="primary"
          variant="outlined"
          className="mr-2 w-full"
          data-testid="language-option-en"
        >
          English
        </Button>
        <Button
          onClick={() => handleLocaleChange('fr')}
          color="primary"
          variant="outlined"
          className="w-full"
          data-testid="language-option-fr"
        >
          Français
        </Button>
      </div>
    </div>
  );
};

export default LanguageSettings;
