'use client';

import MoreOptionsButton from './buttons/MoreOptionsButton';
import { SettingsButton } from './buttons/SettingsDialog';

type NavContentProps = Readonly<{
  onOpenSettingsAction: () => void;
}>;

export default function NavContent({ onOpenSettingsAction }: NavContentProps) {
  return (
    <div className="flex items-center">
      <MoreOptionsButton />
      <SettingsButton onOpenSettingsAction={onOpenSettingsAction} />
    </div>
  );
}
