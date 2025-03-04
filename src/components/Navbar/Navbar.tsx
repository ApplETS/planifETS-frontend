'use client';

import type { SelectChangeEvent } from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const tabs: string[] = [];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();

  const [isNavbarMobileMenuOpen, setIsNavbarMobileMenuOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [appearance, setAppearance] = useState('dark'); // default to dark
  const [language, setLanguage] = useState('French');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Do not render Navbar on the /login page
  if (pathname === '/login') {
    return null;
  }

  const toggleNavbarMobileMenu = () => {
    setIsNavbarMobileMenuOpen(!isNavbarMobileMenuOpen);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAppearanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppearance(event.target.value);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/login');
    setIsNavbarMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 z-20 w-full bg-navbar p-4"
      data-testid="navbar"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex cursor-pointer items-center">
              <span className="text-2xl font-bold text-textDarkBackground">Planif</span>
              <span className="ml-0 text-2xl font-bold text-red-500">ETS</span>
            </div>
          </Link>

          {/* Navigation Tabs for Desktop */}
          {!isMobile && (
            <div className="hidden space-x-2 md:flex">
              {tabs.map(tab => (
                <Button
                  key={tab}
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  {tab}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Buttons and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop/Tablet Login Button */}
          {!isMobile && (
            <div className="flex space-x-2">
              {isLoggedIn
                ? (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                    onClick={handleLogoutClick}
                  >
                    Se déconnecter
                  </Button>
                )
                : (
                  <Link href="/login">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      Se connecter
                    </Button>
                  </Link>
                )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              type="button"
              onClick={toggleNavbarMobileMenu}
              className="text-textDarkBackground hover:text-buttonTags focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <MenuIcon className="text-2xl" />
            </button>
          )}

          {/* Mobile Menu */}
          {isMobile && isNavbarMobileMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md bg-navbar py-1 shadow-lg">
              {isLoggedIn
                ? (
                  <button
                    type="button"
                    className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-textDarkBackground hover:bg-buttonTags hover:text-textLightBackground"
                    onClick={handleLogoutClick}
                    onKeyDown={e => e.key === 'Enter' && handleLogoutClick()}
                    tabIndex={0}
                    role="menuitem"
                    aria-label="Se déconnecter"
                  >
                    Se déconnecter
                  </button>
                )
                : (
                  <Link href="/login">
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-sm text-textDarkBackground hover:bg-buttonTags hover:text-textLightBackground"
                      onClick={() => setIsNavbarMobileMenuOpen(false)}
                      onKeyDown={e => e.key === 'Enter' && setIsNavbarMobileMenuOpen(false)}
                      tabIndex={0}
                      role="menuitem"
                      aria-label="Se connecter"
                    >
                      Se connecter
                    </button>
                  </Link>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Paramètres Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Paramètres</DialogTitle>
        <DialogContent>
          {/* Apparence */}
          <Typography variant="subtitle1" gutterBottom>
            Apparence
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup row value={appearance} onChange={handleAppearanceChange}>
              <FormControlLabel value="dark" control={<Radio />} label="Sombre" />
              <FormControlLabel value="light" control={<Radio />} label="Clair" />
            </RadioGroup>
          </FormControl>

          {/* Langue */}
          <Typography variant="subtitle1" gutterBottom style={{ marginTop: '1em' }}>
            Langue
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="language-select-label">Langue</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              onChange={handleLanguageChange}
              label="Langue"
            >
              <MenuItem value="French">Français</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
          </FormControl>

          {/* Données */}
          <Typography variant="subtitle1" gutterBottom style={{ marginTop: '1em' }}>
            Données
          </Typography>
          <div className="flex items-center">
            <Typography variant="subtitle2">Supprimer cache cours</Typography>
            <Button variant="contained" color="error" style={{ marginLeft: 'auto' }}>
              Supprimer
            </Button>
          </div>
          <Typography variant="body2" color="textSecondary">
            Cela permet d&#39;effacer toutes les données de cours stockées sur votre
            navigateur.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
}
