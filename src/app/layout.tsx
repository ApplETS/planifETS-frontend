import { Suspense } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Navbar from '../components/Navbar/Navbar';
import ClientProviders from '../components/Providers/ClientProviders';
import ThemeProvider from '../components/ThemeProvider';
import DndContext from '../context/dnd/DndContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
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
        </Suspense>
      </body>
    </html>
  );
}
