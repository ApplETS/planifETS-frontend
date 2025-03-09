'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '../atoms/Logo';
import NavContent from './NavContent';

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="fixed top-0 z-20 w-full bg-navbar p-4">
      <div className="flex items-center justify-between">
        <Logo textSize="text-2xl" position="relative" />
        {isMobile
          ? (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )
          : (
            <div className="ml-auto">
              <NavContent />
            </div>
          )}
      </div>

      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div className="w-48 p-4">
            <NavContent />
          </div>
        </Drawer>
      )}
    </nav>
  );
}
