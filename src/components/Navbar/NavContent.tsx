'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { SettingsButton } from './buttons/SettingsDialog';

type NavContentProps = {
  closeSheetAction?: () => void;
  onOpenSettingsAction: () => void;
};

export default function NavContent({ closeSheetAction, onOpenSettingsAction }: NavContentProps) {
  const isMobile = useIsMobile();

  const navContentClasses = isMobile
    ? 'flex flex-col items-start flex flex-col gap-4 p-2'
    : 'flex flex-row items-center space-x-4 text-foreground';

  return (
    <div className={navContentClasses}>
      <SettingsButton onOpenSettingsAction={onOpenSettingsAction} closeSheetAction={closeSheetAction} />
    </div>
  );
}
