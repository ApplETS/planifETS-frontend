'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import SettingsDialog from './buttons/SettingsDialog';

export default function NavContent({ closeSheetAction }: { closeSheetAction?: () => void }) {
  const isMobile = useIsMobile();

  const navContentClasses = isMobile
    ? 'flex flex-col items-start flex flex-col gap-4 p-2'
    : 'flex flex-row items-center space-x-4 text-foreground';

  return (
    <div className={navContentClasses}>
      <SettingsDialog closeSheetAction={closeSheetAction} />
    </div>
  );
}
