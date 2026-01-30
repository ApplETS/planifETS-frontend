'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import ProgramSelector from '@/components/ProgramSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shadcn/ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/ui/select';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useProgramStore } from '@/store/programStore';
import { SessionEnum } from '@/types/session';
import {
  getCurrentSession,
  getTranslationKey,
  SESSION_SELECTION_BOUNDS,
} from '@/utils/sessionUtils';

type OnboardingDialogProps = {
  isOpen: boolean;
};

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ isOpen }) => {
  const tOnboarding = useTranslations('Onboarding');
  const tPlannerPage = useTranslations('PlannerPage');
  const isMobile = useIsMobile();

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedTerm, setSelectedTerm] = useState<SessionEnum>(() =>
    getCurrentSession(),
  );

  const programStore = useProgramStore();
  const selectedPrograms = programStore.getSelectedProgramIds();
  const { completeOnboarding } = useOnboardingStore();
  const { initializePlanner } = usePlannerStore();

  const handleComplete = () => {
    if (selectedPrograms.length === 0) {
      return;
    }

    // Initialize planner with start session
    initializePlanner(selectedYear, selectedTerm);

    // Mark onboarding as complete
    completeOnboarding(selectedYear, selectedTerm);
  };

  const isValid = selectedPrograms.length > 0;

  const renderContent = () => {
    const minYear = currentYear - SESSION_SELECTION_BOUNDS.PAST_YEARS;
    const maxYear = currentYear + SESSION_SELECTION_BOUNDS.FUTURE_YEARS;

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const year = Number(e.target.value);
      if (year >= minYear && year <= maxYear) {
        setSelectedYear(year);
      }
    };

    return (
      <div className="space-y-4 border-0.5 m-2">
        <div>
          <label
            id="program-label"
            className="text-sm font-medium text-foreground mb-1 block"
          >
            {tOnboarding('program-label')}
          </label>
          <div className="relative z-50" role="group" aria-labelledby="program-label">
            <ProgramSelector />
          </div>
        </div>
        <div className="space-y-1">
          <label
            id="admission-day-label"
            className="text-sm font-medium text-foreground mb-1 block"
          >
            {tOnboarding('admission-day-label')}
          </label>
          <div className="flex gap-2">
            <Select
              value={selectedTerm}
              onValueChange={(v) => setSelectedTerm(v as SessionEnum)}
            >
              <SelectTrigger
                aria-labelledby="admission-day-label"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                    {tOnboarding('admission-day-label')}
                  </SelectLabel>
                  {Object.values(SessionEnum).map((term) => (
                    <SelectItem key={term} value={term}>
                      {tPlannerPage(getTranslationKey(term))}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <input
              id="admission-year"
              name="admission-year"
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
      </div>
    );
  };

  const renderFooter = () => (
    <Button data-testid="onboarding-complete" onClick={handleComplete} disabled={!isValid} className="w-full">
      <Check className="h-4 w-4" />
      {tOnboarding('complete')}
    </Button>
  );

  const content = renderContent();

  if (isMobile) {
    return (
      <Drawer open={isOpen} dismissible={false}>
        <DrawerContent className="overflow-visible">
          <DrawerHeader>
            <DrawerTitle>{tOnboarding('welcome-title')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">{content}</div>
          <DrawerFooter>{renderFooter()}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="[&>button]:hidden sm:max-w-[500px] border-1 border-border overflow-visible"
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{tOnboarding('welcome-title')}</DialogTitle>
          <DialogDescription className="sr-only">Onboarding dialog</DialogDescription>
        </DialogHeader>
        <div className="py-3">{content}</div>
        <DialogFooter>{renderFooter()}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
