'use client';

import React from 'react';

import CourseSidebar from '../../components/Sidebar/CourseSidebar';

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full md:fixed md:h-screen md:w-[280px]">
        <div className="p-4">
          <CourseSidebar />
        </div>
      </aside>
      <main className="w-full md:pl-[340px]">
        <div className="pl-2 pr-4 py-4">
          {children}
        </div>
      </main>
    </div>
  );
}
