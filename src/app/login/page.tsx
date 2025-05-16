'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('LoginPage');

  const { login } = useAuthStore();
  const [codeUniversel, setCodeUniversel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login();

    router.push('/planner');
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border-2 border-foreground bg-background p-6 shadow-md md:p-8">
      <h1 className="mb-2 text-2xl font-medium text-foreground underline">
        {t('title')}
      </h1>
      <p className="mb-4 text-base text-foreground">
        {t('description')}
      </p>
      <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
        <InputField
          id="codeUniversel"
          label={t('universal-code')}
          type="text"
          value={codeUniversel}
          placeholder="AS12345"
          onChange={e => setCodeUniversel(e.target.value)}
        />
        <InputField
          id="motDePasse"
          label={t('password')}
          type="password"
          value={motDePasse}
          placeholder={t('password-placeholder')}
          onChange={e => setMotDePasse(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-primary py-3 font-bold uppercase text-background transition-colors duration-200 hover:bg-muted-foreground"
        >
          {t('login')}
        </button>
      </form>
      <div className="my-4 flex items-center">
        <hr className="grow border-t border-foreground" />
        <span className="mx-4 text-sm text-foreground">
          {t('or')}
        </span>
        <hr className="grow border-t border-foreground" />
      </div>
      <Link href="/planner">
        <button
          type="button"
          className="w-full text-center text-base text-foreground hover:underline"
          onClick={() => {
            useAuthStore.getState().logout();
          }}
        >
          {t('continue-as-guest')}
        </button>
      </Link>
    </div>
  );
}
