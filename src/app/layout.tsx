import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';

import ErrorBoundary from '../components/ErrorBoundary';

import Navbar from '../components/Navbar/Navbar';
import ClientProviders from '../components/Providers/ClientProviders';
import ThemeProvider from '../components/ThemeProvider';
import DndContext from '../context/dnd/DndContext';
import { PlannerProvider } from '../context/planner/PlannerContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider>
              <DndContext>
                <ClientProviders>
                  <PlannerProvider>
                    <div className="min-h-screen bg-background pt-16 text-textDarkBackground">
                      <main>
                        <Navbar />
                        {children}
                        <Analytics />
                      </main>
                    </div>
                  </PlannerProvider>
                </ClientProviders>
              </DndContext>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
