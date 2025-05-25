import { useLocale } from 'next-intl';
import { setUserLocale } from '@/services/locale';
import { Button } from '@/shadcn/ui/button';

const LanguageSelector = () => {
  const locale = useLocale();

  const handleLocaleChange = async (locale: 'en' | 'fr') => {
    await setUserLocale(locale);
  };

  const getButtonStyles = (isSelected: boolean) =>
    [
      'flex-1 px-4 py-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      isSelected
        ? 'bg-primary text-primary-foreground font-semibold shadow cursor-default pointer-events-none'
        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer',
    ].join(' ');

  return (
    <div className="flex flex-row gap-2 p-2 bg-muted rounded-md">
      <Button
        variant="ghost"
        onClick={() => handleLocaleChange('en')}
        className={getButtonStyles(locale === 'en')}
        tabIndex={0}
        aria-label="Switch to English"
      >
        English
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleLocaleChange('fr')}
        className={getButtonStyles(locale === 'fr')}
        tabIndex={0}
        aria-label="Passer en français"
      >
        Français
      </Button>
    </div>
  );
};

export default LanguageSelector;
