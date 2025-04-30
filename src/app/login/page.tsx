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
    <div className="mx-auto w-full max-w-md rounded-[27px] border-2 border-textDarkBackground bg-primary p-6 shadow-md md:p-8">
      <h1 className="mb-2 text-2xl font-medium text-textDarkBackground underline">
        {t('title')}
      </h1>
      <p className="mb-4 text-base text-textDarkBackground">
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
          className="w-full rounded-md bg-buttonTags py-3 font-bold uppercase text-background transition-colors duration-200 hover:bg-loginButtonHover"
        >
          {t('login')}
        </button>
      </form>
      <div className="my-4 flex items-center">
        {/* FIXME: hardcoded color */}
        <hr className="grow border-t border-textDarkBackground/50" />
        <span className="mx-4 text-sm text-textDarkBackground">{t('or')}</span>
        {/* FIXME: hardcoded color */}
        <hr className="grow border-t border-textDarkBackground/50" />
      </div>
      <Link href="/planner">
        <button
          type="button"
          className="w-full text-center text-base text-textDarkBackground hover:underline"
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
