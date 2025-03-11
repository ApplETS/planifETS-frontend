import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Navbar from '../components/Navbar/Navbar';
import ClientProviders from '../components/Providers/ClientProviders';
import ThemeProvider from '../components/ThemeProvider';
import DndContext from '../context/dnd/DndContext';
import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <NextIntlClientProvider messages={messages}>
            <ErrorBoundary>
              <ThemeProvider>
                <DndContext>
                  <ClientProviders>
                    <div className="min-h-screen bg-background pt-16 text-textDarkBackground">
                      <main>
                        <Navbar />
                        {children}
                      </main>
                    </div>
                  </ClientProviders>
                </DndContext>
              </ThemeProvider>
            </ErrorBoundary>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
