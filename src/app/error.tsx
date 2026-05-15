'use client';

import { useEffect } from 'react';
import { monitoring } from '@/lib/monitoring';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    monitoring.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg border border-foreground/10">
        <h2 className="mb-4 text-2xl font-bold text-red-500">
          Oops! Une erreur est survenue
        </h2>
        <p className="mb-4 text-foreground">
          Veuillez rafraîchir la page ou réessayer plus tard.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
