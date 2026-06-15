'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useLatestAvailableSessionApi } from '@/api/hooks/useLatestAvailableSessionApi';
import ChatbotButton from '@/components/Chatbot/ChatbotButton';
import ChatbotPanel from '@/components/Chatbot/ChatbotPanel';

import { ProgramSection } from '@/components/Planner/ProgramSection';
import YearSection from '@/components/Planner/YearSection';
import { usePreloadCourses } from '@/hooks/course/usePreloadCourses';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { Button } from '@/shadcn/ui/button';
import { useCourseStore } from '@/store/courseStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';

import { useSessionStore } from '@/store/sessionStore';
import { accumulateCreditSplit } from '@/utils/creditUtil';
import { buildDuplicateCourseSessionIndex } from '@/utils/sessionUtil';

export default function PlannerPage() {
  const t = useTranslations('Commons');
  const router = useRouter();

  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, sessions } = useSessionStore();
  const { courses } = useCourseStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { onboardingHydrated, allHydrated } = useStoreHydration();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useLatestAvailableSessionApi();
  usePreloadCourses(allHydrated);

  useEffect(() => {
    if (!onboardingHydrated) {
      return;
    }

    if (!hasCompletedOnboarding) {
      router.replace('/welcome');
      return;
    }

    if (!allHydrated) {
      return;
    }

    const plannerState = usePlannerStore.getState();
    const sessionState = useSessionStore.getState();
    const onboardingState = useOnboardingStore.getState();

    // Only initialize if both stores are empty (first time after onboarding)
    if (
      plannerState.sessionKeys.length === 0
      && Object.keys(sessionState.sessions).length === 0
    ) {
      const startSession = onboardingState.getStartYear();
      if (startSession) {
        initializePlanner(startSession.startYear);
      }
    }
  }, [initializePlanner, onboardingHydrated, allHydrated, hasCompletedOnboarding, router]);

  const years = getYears();

  // Calculate total credits across all sessions, split by course vs stage
  const { totalCourseCredits, totalStageCredits }
    = Object.values(sessions).reduce(
      (acc, session) => {
        const split = accumulateCreditSplit(session.courseInstances, courses);
        acc.totalCourseCredits += split.totalCourseCredits;
        acc.totalStageCredits += split.totalStageCredits;
        return acc;
      },
      { totalCourseCredits: 0, totalStageCredits: 0 },
    );

  // Build an index to identify duplicate course sessions
  const duplicateCourseSessionIndex = useMemo(
    () => buildDuplicateCourseSessionIndex(sessions),
    [sessions],
  );

  if (onboardingHydrated && !hasCompletedOnboarding) {
    return null;
  }

  return (
    <div
      className={`flex w-full flex-col transition-all duration-300 ${
        isChatOpen ? 'md:pr-[370px]' : ''
      }`}
      data-print-root="planner"
    >
      <div className="w-full">
        <ProgramSection />
      </div>

      <div className="w-full flex flex-col gap-4 p-2" data-testid="year-sections">
        {years.map((year) => (
          <YearSection
            key={year}
            year={year}
            sessions={getSessionsByYear(year)}
            isFirstYear={year === Math.min(...years)}
            isLastYear={year === Math.max(...years)}
            duplicateCourseSessionIndex={duplicateCourseSessionIndex}
          />
        ))}
      </div>

      <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
        <Button
          variant="secondary"
          size="default"
          className="pointer-events-none select-none cursor-default"
          tabIndex={-1}
          data-testid="total-credits"
        >
          {totalCourseCredits}
          {' '}
          {t('total-credits')}
        </Button>
        <Button
          variant="secondary"
          size="default"
          className="pointer-events-none select-none cursor-default"
          tabIndex={-1}
          data-testid="total-stage-credits"
        >
          {totalStageCredits}
          {' '}
          {t('stage-credits')}
        </Button>
        <Button
          variant="default"
          size="default"
          onClick={addYear}
          data-testid="add-year-button"
          data-print-hidden="true"
        >
          <Plus />
          {t('add-year')}
        </Button>
      </div>
      {/* Assistant PlanifETS */}
      {isChatOpen && (
        <ChatbotPanel
          onClose={() => setIsChatOpen(false)}
        />
      )}

      <ChatbotButton
        isOpen={isChatOpen}
        onClick={() => setIsChatOpen((prev) => !prev)}
      />
    </div>
  );
}
