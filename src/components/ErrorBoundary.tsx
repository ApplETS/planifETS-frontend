'use client';

import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-500">
              Oops! Une erreur est survenue
            </h2>
            <p className="mb-4 text-foreground ">
              Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-sm bg-primary px-4 py-2 text--primary-foreground transition-colors hover:bg-primary/90"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
