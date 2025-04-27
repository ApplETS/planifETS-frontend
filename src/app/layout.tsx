import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Navbar from '../components/Navbar/Navbar';
import ClientProviders from '../components/Providers/ClientProviders';
import DndContext from '../context/dnd/DndContext';
import './globals.css';
import { ThemeProvider } from 'next-themes';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <NextIntlClientProvider messages={messages}>
              <ErrorBoundary>
                <DndContext>
                  <ClientProviders>
                    <div className="min-h-screen pt-16">
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
