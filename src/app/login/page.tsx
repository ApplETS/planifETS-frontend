'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuthStore();
  const [codeUniversel, setCodeUniversel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FIXME: hardcoded credentials
    // TODO: implement SOAP call using libs or smth
    // Validate credentials
    // if (
    // (codeUniversel.toUpperCase() === 'AS12345') &&
    // motDePasse === '12345678'
    // ) {
    login();

    // Redirect to /planner
    router.push('/planner');
    // } else {
    //   // Show error message
    //   setErrorMessage("Code universel ou mot de passe incorrect.");
    // }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-[27px] border-2 border-textDarkBackground bg-yearSection p-6 shadow-md md:p-8">
      {/* Header Text */}
      <h1 className="mb-2 text-2xl font-medium text-textDarkBackground underline">
        Se connecter avec Signets
      </h1>

      {/* Subtext */}
      <p className="mb-4 text-base text-textDarkBackground">
        Accédez à tous vos cours complétés!
      </p>

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Code Universel */}
        <InputField
          id="codeUniversel"
          label="Code universel"
          type="text"
          value={codeUniversel}
          placeholder="AS12345"
          onChange={e => setCodeUniversel(e.target.value)}
        />

        {/* Mot de Passe */}
        <InputField
          id="motDePasse"
          label="Mot de passe"
          type="password"
          value={motDePasse}
          placeholder="Votre mot de passe"
          onChange={e => setMotDePasse(e.target.value)}
        />

        {/* Error Message */}
        {/* errorMessage && <div className="mb-4 text-sm text-red-500">{errorMessage}</div> */}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-buttonTags py-3 font-bold uppercase text-background transition-colors duration-200 hover:bg-loginButtonHover"
        >
          SE CONNECTER
        </button>
      </form>

      {/* Separator */}
      <div className="my-4 flex items-center">
        {/* FIXME: hardcoded color */}
        <hr className="grow border-t border-[#D5C8EE]" />
        <span className="mx-4 text-sm text-textDarkBackground">OU</span>
        {/* FIXME: hardcoded color */}
        <hr className="grow border-t border-[#D5C8EE]" />
      </div>

      {/* Guest Option */}
      <Link href="/planner">
        <button
          type="button"
          className="w-full text-center text-base text-textDarkBackground hover:underline"
          onClick={() => {
            useAuthStore.getState().logout();
          }}
        >
          Continuer en tant qu&apos;invité
        </button>
      </Link>
    </div>
  );
}
