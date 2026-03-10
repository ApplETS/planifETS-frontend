'use client';

import type { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Component } from 'react';
import { Button } from '@/shadcn/ui/button';

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
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg border border-foreground/10">
            <h2 className="mb-4 text-2xl font-bold text-red-500">
              Oops! Une erreur est survenue
            </h2>
            <p className="mb-4 text-foreground">
              Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <Button
              type="button"
              onClick={() => window.location.reload()}
            >
              Rafraîchir la page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
