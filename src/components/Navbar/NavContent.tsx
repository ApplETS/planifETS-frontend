'use client';

import { SettingsButton } from './buttons/SettingsDialog';

type NavContentProps = Readonly<{
  onOpenSettingsAction: () => void;
}>;

export default function NavContent({ onOpenSettingsAction }: NavContentProps) {
  return (
    <div className="flex items-center">
      <SettingsButton onOpenSettingsAction={onOpenSettingsAction} />
    </div>
  );
}
