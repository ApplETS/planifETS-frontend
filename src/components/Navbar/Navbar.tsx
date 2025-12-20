'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shadcn/ui/sheet';
import Logo from '../atoms/Logo';
import NavContent from './NavContent';

// eslint-disable-next-line no-console
console.log('Version:', process.env.NEXT_PUBLIC_APP_GIT_SHORT_SHA);

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const closeSheetAction = () => setOpen(false);

  return (
    <nav className="fixed top-0 z-20 w-full bg-secondary p-4" data-testid="navbar">
      <div className="flex items-center justify-between">
        <Logo textSize="text-2xl" position="relative" />
        {/* Desktop Navigation */}
        <div className="hidden md:flex ml-auto">
          <NavContent />
        </div>
        {/* Mobile Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={isMobile ? 'inset-0 h-full w-full p-4 m-0 rounded-none' : 'top-0 right-0 h-full w-80 p-4 m-0 rounded-none'}
          >
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Menu</SheetTitle>
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
              <NavContent closeSheetAction={closeSheetAction} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
