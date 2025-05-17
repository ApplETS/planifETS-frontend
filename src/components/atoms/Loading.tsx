import { useTranslations } from 'next-intl';

const Loading = () => {
  const t = useTranslations('Commons');

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-foreground">{t('loading')}</p>
      </div>
    </div>
  );
};

export default Loading;
