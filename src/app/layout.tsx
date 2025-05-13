import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Navbar from '../components/Navbar/Navbar';
import ClientProviders from '../components/Providers/ClientProviders';
import DndContext from '../context/dnd/DndContext';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen  transition-colors duration-300">
        <ThemeProvider>
          <Suspense fallback={null}>
            <NextIntlClientProvider messages={messages}>
              <ErrorBoundary>
                <DndContext>
                  <ClientProviders>
                    <div className="min-h-screen pt-16 text-foreground bg-background dark:bg-background">
                      <main>
                        <Navbar />
                        {children}
                      </main>
                    </div>
                  </ClientProviders>
                </DndContext>
              </ErrorBoundary>
            </NextIntlClientProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
