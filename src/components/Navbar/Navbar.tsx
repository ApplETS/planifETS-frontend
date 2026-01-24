'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ResetDialog from '@/components/dialogs/ResetDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shadcn/ui/sheet';
import Logo from '../atoms/Logo';
import { SettingsDialog } from './buttons/SettingsDialog';
import NavContent from './NavContent';

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
      <nav className="fixed top-0 z-20 w-full bg-secondary p-4" data-testid="navbar">
        <div className="flex items-center justify-between">
          <Logo textSize="text-2xl" position="relative" />
          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-auto">
            <NavContent onOpenSettingsAction={openSettings} />
          </div>
          {/* Mobile Hamburger Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={
                isMobile
                  ? 'inset-0 h-full w-full p-4 m-0 rounded-none'
                  : 'top-0 right-0 h-full w-80 p-4 m-0 rounded-none'
              }
            >
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation menu
                  </SheetDescription>
                  <Button
                    type="button"
                    size="icon"
                    onClick={closeSheetAction}
                    className="ml-2"
                    aria-label="Close menu"
                    variant="link"
                  >
                    <X className="size-5" />
                  </Button>
                </div>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <NavContent
                  closeSheetAction={closeSheetAction}
                  onOpenSettingsAction={openSettings}
                />
              </div>
            </SheetContent>
          </Sheet>
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
