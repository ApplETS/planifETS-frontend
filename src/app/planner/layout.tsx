'use client';

import React from 'react';
import CourseSidebar from '@/components/Sidebar/CourseSidebar';

import { useOnboardingStore } from '@/store/onboardingStore';

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row" data-planner-layout="true">
      {hasCompletedOnboarding && (
        <aside className="w-full md:fixed md:h-screen md:w-[280px]" data-print-hidden="true">
          <div className="p-4">
            <CourseSidebar />
          </div>
        </aside>
      )}
      <main
        className={hasCompletedOnboarding ? 'w-full md:pl-[340px]' : 'w-full'}
        data-planner-main="true"
      >
        <div className="pl-2 pr-2 py-4" data-planner-main-inner="true">{children}</div>
      </main>
    </div>
  );
}
