'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/atoms/Logo';
import ResetDialog from '@/components/dialogs/ResetDialog';
import { SettingsButton, SettingsDialog } from '@/components/Navbar/buttons/SettingsDialog';
import NavContent from '@/components/Navbar/NavContent';
import NavLinks from '@/components/Navbar/NavLinks';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/shadcn/ui/sheet';

if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-console
  console.log('Version:', process.env.NEXT_PUBLIC_APP_GIT_SHORT_SHA);
}

export default function Navbar() {
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const closeSheetAction = () => setSheetOpen(false);
  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);
  const openReset = () => setResetOpen(true);
  const closeReset = () => setResetOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 z-[60] w-full border-b p-4 ${
          sheetOpen && isMobile
            ? 'border-border bg-background'
            : 'border-border/30 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 dark:border-border/45 dark:bg-background/30 dark:supports-[backdrop-filter]:bg-background/18'
        }`}
        data-testid="navbar"
      >
        <div className="flex items-center justify-between">
          <Logo />
          {/* Center links for desktop */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <NavLinks />
          </div>

          {/* Desktop Settings Button on right */}
          <div className="hidden md:flex md:items-center">
            <NavContent onOpenSettingsAction={openSettings} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <SettingsButton onOpenSettingsAction={openSettings} />

            {/* Mobile Hamburger Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <Button
                variant="ghost"
                onClick={() => setSheetOpen((prevOpen) => !prevOpen)}
                aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
              >
                <Menu className="size-5" />
                <span className="sr-only">{sheetOpen ? 'Close menu' : 'Open menu'}</span>
              </Button>
              <SheetContent
                side="right"
                hideCloseButton={true}
                className={
                  isMobile
                    ? 'top-16 right-0 h-[calc(100vh-4rem)] w-full p-4 m-0 rounded-none border-t'
                    : 'top-0 right-0 h-full w-80 p-4 m-0 rounded-none'
                }
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Open the planner or course details pages.
                </SheetDescription>
                <div className="flex flex-col items-start gap-2 px-4 py-4">
                  <NavLinks onNavigateAction={closeSheetAction} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <SettingsDialog
        isOpen={settingsOpen}
        onCloseAction={closeSettings}
        onOpenResetAction={openReset}
      />
      <ResetDialog isOpen={resetOpen} onCloseAction={closeReset} />
    </>
  );
}
