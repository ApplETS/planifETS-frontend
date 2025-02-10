'use client';

import React from 'react';

import CourseSidebar from '../../components/Sidebar/CourseSidebar';
import { ProgramProvider } from '../../context/program/ProgramProvider';

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgramProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full md:fixed md:h-screen md:w-[280px]">
          <div className="p-4">
            <CourseSidebar />
          </div>
        </aside>
        <main className="w-full md:pl-[340px]">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </ProgramProvider>
  );
}
