import { create } from 'zustand';
import { persistConfig } from '../../lib/persistConfig';

type AuthState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persistConfig('authStore', set => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
  })),
);
