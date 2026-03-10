import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import Loading from '@/components/atoms/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar/Navbar';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { Toaster } from '@/shadcn/ui/sonner';
import DndContext from '../context/dnd/DndContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'PlanifETS',
  description: 'Planificateur de sessions pour les étudiants de l\'École de technologie supérieure',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.APP_ENV !== 'development'
          ? (
            <script
              defer
              src="/stats/script.js"
              data-host-url="/stats"
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''}
            />
          )
          : null}
      </head>
      <body className="min-h-screen transition-colors duration-300 bg-background">
        <ThemeProvider>
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <NextIntlClientProvider messages={messages}>
                <Toaster richColors />
                <DndContext>
                  <div className="min-h-screen pt-16 text-foreground bg-background">
                    <main>
                      <Navbar />
                      {children}
                    </main>
                  </div>
                </DndContext>
              </NextIntlClientProvider>
            </ErrorBoundary>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
