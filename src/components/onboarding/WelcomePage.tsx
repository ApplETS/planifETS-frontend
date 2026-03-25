'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProgramSelector from '@/components/Planner/ProgramMultiSelector';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { Button } from '@/shadcn/ui/button';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useProgramStore } from '@/store/programStore';
import { appRoutes } from '@/utils/routesUtil';
import { SESSION_SELECTION_BOUNDS } from '@/utils/sessionUtil';

const WelcomePage = () => {
  const tOnboarding = useTranslations('Onboarding');
  const tCommons = useTranslations('Commons');
  const router = useRouter();
  const hasHydrated = useStoreHydration();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const selectedPrograms = useProgramStore((state) => state.getSelectedProgramIds());
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);
  const initializePlanner = usePlannerStore((state) => state.initializePlanner);

  useEffect(() => {
    if (!hasHydrated || !hasCompletedOnboarding) {
      return;
    }

    router.replace(appRoutes.planner);
  }, [hasCompletedOnboarding, hasHydrated, router]);

  const minYear = currentYear - SESSION_SELECTION_BOUNDS.PAST_YEARS;
  const maxYear = currentYear + SESSION_SELECTION_BOUNDS.FUTURE_YEARS;

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number(e.target.value);
    if (year >= minYear && year <= maxYear) {
      setSelectedYear(year);
    }
  };

  const handleComplete = () => {
    if (selectedPrograms.length === 0) {
      return;
    }

    initializePlanner(selectedYear);
    completeOnboarding(selectedYear);
    router.replace(appRoutes.planner);
  };

  if (!hasHydrated) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center px-4 py-10">
        <p className="text-sm text-muted-foreground">{tCommons('loading')}</p>
      </div>
    );
  }

  if (hasCompletedOnboarding) {
    return null;
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8" data-testid="welcome-page">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center">
        <section className="w-full overflow-visible rounded-[2rem] border border-border/70 bg-background/95 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {tOnboarding('welcome-title')}
            </h1>

            <div className="mt-8 space-y-6">
              <fieldset className="min-w-0 border-0 p-0">
                <legend
                  id="program-label"
                  className="mb-1 block text-sm font-medium text-foreground"
                >
                  {tOnboarding('program-label')}
                </legend>
                <div className="relative z-50">
                  <ProgramSelector />
                </div>
              </fieldset>

              <div className="space-y-1">
                <label
                  id="admission-day-label"
                  className="mb-1 block text-sm font-medium text-foreground"
                >
                  {tOnboarding('admission-day-label')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="admission-year"
                    name="admission-year"
                    data-testid="admission-year"
                    type="number"
                    value={selectedYear}
                    onChange={handleYearChange}
                    min={minYear}
                    max={maxYear}
                    aria-labelledby="admission-day-label"
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {tOnboarding('admission-day-note')}
                </p>
              </div>

              <Button
                data-testid="onboarding-complete"
                onClick={handleComplete}
                disabled={selectedPrograms.length === 0}
                className="w-full"
              >
                <Check className="h-4 w-4" />
                {tOnboarding('complete')}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WelcomePage;
