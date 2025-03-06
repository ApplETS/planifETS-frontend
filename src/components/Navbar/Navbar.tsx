'use client';

import { useAuthStore } from '@/store/authStore';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Drawer, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '../atoms/Logo';
import BaseDialog from '../BaseDialog';
import LanguageSettings from '../LanguageSettings';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (pathname === '/login') {
    return null;
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/login');
  };

  const renderAuthButton = () => {
    if (!isLoggedIn) {
      return (
        <Link href="/login">
          <button type="button" className="rounded bg-buttonTags px-4 py-2 text-white">
            Se connecter
          </button>
        </Link>
      );
    }
    return (
      <button
        type="button"
        onClick={handleLogoutClick}
        className="rounded bg-buttonTags px-4 py-2 text-white"
      >
        Se déconnecter
      </button>
    );
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-navbar p-4">
      <div className="flex items-center justify-between">
        <Logo textSize="text-2xl" position="relative" />

        <div className="ml-auto hidden items-center space-x-4 md:flex">
          {renderAuthButton()}
          <IconButton onClick={() => setDialogOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </div>

        <div className="md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-48 p-4">
          {renderAuthButton()}
        </div>
      </Drawer>

      <BaseDialog isOpen={dialogOpen} title="Settings" onClose={() => setDialogOpen(false)}>
        <LanguageSettings onClose={() => setDialogOpen(false)} />
      </BaseDialog>
    </nav>
  );
}
