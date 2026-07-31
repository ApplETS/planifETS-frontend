'use client';

import React from 'react';
import CourseSidebar from '@/components/Sidebar/CourseSidebar';

import { useOnboardingStore } from '@/store/onboardingStore';

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  return (
    <div
      className={hasCompletedOnboarding
        ? 'flex min-h-screen flex-col md:grid md:grid-cols-[clamp(18rem,26vw,22rem)_minmax(0,1fr)]'
        : 'min-h-screen'}
      data-planner-layout="true"
    >
      {hasCompletedOnboarding && (
        <aside className="w-full md:sticky md:top-16 md:h-[calc(100vh-4rem)]" data-print-hidden="true">
          <div className="h-full p-4 md:pr-2">
            <CourseSidebar />
          </div>
        </aside>
      )}
      <main
        className="min-w-0 w-full"
        data-planner-main="true"
      >
        <div className="pr-2 py-4" data-planner-main-inner="true">{children}</div>
      </main>
    </div>
  );
}
