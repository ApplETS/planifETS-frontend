'use client';

import { useAuthStore } from '@/store/authStore';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import BaseButton from './BaseButton';

export default function AuthButton() {
  const router = useRouter();
  const t = useTranslations('Commons');

  const { isLoggedIn, logout } = useAuthStore();

  const handleLogoutClick = () => {
    logout();
    router.push('/login');
  };

  if (!isLoggedIn) {
    return (
      <Link href="/login">
        <BaseButton variant="primary" size="md">
          {t('login')}
        </BaseButton>
      </Link>
    );
  }

  return (
    <BaseButton
      variant="primary"
      size="md"
      onClick={handleLogoutClick}
    >
      {t('logout')}
    </BaseButton>
  );
}
