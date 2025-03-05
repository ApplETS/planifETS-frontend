'use client';

import { useAuthStore } from '@/store/authStore';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();
  const [isNavbarMobileMenuOpen, setIsNavbarMobileMenuOpen] = useState(false);

  if (pathname === '/login') {
    return;
  }

  const toggleNavbarMobileMenu = () => {
    setIsNavbarMobileMenuOpen(!isNavbarMobileMenuOpen);
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-navbar p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-textDarkBackground">
          PlanifETS
        </Link>

        <div className="flex items-center space-x-4">
          {!isLoggedIn
            ? (
              <Link href="/login">
                <button type="button" className="rounded bg-buttonTags px-4 py-2 text-white">Se connecter</button>
              </Link>
            )
            : (
              <button type="button" onClick={handleLogoutClick} className="rounded bg-buttonTags px-4 py-2 text-white">
                Se déconnecter
              </button>
            )}

          <button type="button" onClick={toggleNavbarMobileMenu} className="text-textDarkBackground">
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isNavbarMobileMenuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md bg-navbar py-1 shadow-lg">
          {!isLoggedIn
            ? (
              <Link href="/login">
                <button type="button" className="block w-full px-4 py-2 text-left text-sm text-textDarkBackground hover:bg-buttonTags hover:text-textLightBackground">
                  Se connecter
                </button>
                {' '}
                {/** TODO: translations */}
                {/** TODO: try to remove duplicate code mobile/desktop */}
              </Link>
            )
            : (
              <button
                type="button"
                onClick={handleLogoutClick}
                className="block w-full px-4 py-2 text-left text-sm text-textDarkBackground hover:bg-buttonTags hover:text-textLightBackground"
              >
                Se déconnecter
              </button>
            )}
        </div>
      )}
    </nav>
  );
}
