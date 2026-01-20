'use client';

import { Check, ChevronRight } from 'lucide-react';
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shadcn/ui/drawer';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useProgramStore } from '@/store/programStore';
import { SessionEnum } from '@/types/session';
import {
  getCurrentSession,
  getTranslationKey,
  SESSION_SELECTION_BOUNDS,
} from '@/utils/sessionUtils';

type OnboardingStep = 'program' | 'session';

type OnboardingDialogProps = {
  isOpen: boolean;
};

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ isOpen }) => {
  const tOnboarding = useTranslations('Onboarding');
  const tPlannerPage = useTranslations('PlannerPage');
  const isMobile = useIsMobile();

  const currentYear = new Date().getFullYear();

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('program');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedTerm, setSelectedTerm] = useState<SessionEnum>(() =>
    getCurrentSession(),
  );

  const programStore = useProgramStore();
  const selectedPrograms = programStore.getSelectedPrograms();
  const { completeOnboarding } = useOnboardingStore();
  const { initializePlanner } = usePlannerStore();

  const handleProgramNext = () => {
    if (selectedPrograms.length === 0) {
      return;
    }
    setCurrentStep('session');
  };

  const handleComplete = () => {
    if (selectedPrograms.length === 0) {
      return;
    }

    // Initialize planner with start session
    initializePlanner(selectedYear, selectedTerm);

    // Mark onboarding as complete
    completeOnboarding(selectedYear, selectedTerm);
  };

  const isProgramStepValid = selectedPrograms.length > 0;

  const renderProgramStep = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{tOnboarding('program-label')}</label>
        <div className="relative z-50">
          <ProgramSelector />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {tOnboarding('program-description')}
      </p>
    </div>
  );

  const renderSessionStep = () => {
    const minYear = currentYear - SESSION_SELECTION_BOUNDS.PAST_YEARS;
    const maxYear = currentYear + SESSION_SELECTION_BOUNDS.FUTURE_YEARS;

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const year = Number(e.target.value);
      if (year >= minYear && year <= maxYear) {
        setSelectedYear(year);
      }
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {tOnboarding('start-session-label')}
          </label>
          <div className="flex gap-2">
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as SessionEnum)}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {Object.values(SessionEnum).map((term) => (
                <option key={term} value={term}>
                  {tPlannerPage(getTranslationKey(term))}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={handleYearChange}
              min={minYear}
              max={maxYear}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </div>
    );
  };

  const getStepTitle = () => {
    const stepNumber = currentStep === 'program' ? 1 : 2;
    const stepPrefix = `${tOnboarding('step')} ${stepNumber} ${tOnboarding('of')} 2`;
    const title
      = currentStep === 'program'
        ? tOnboarding('program-step-title')
        : tOnboarding('session-step-title');
    return `${stepPrefix}: ${title}`;
  };

  const getStepDescription = () => {
    return currentStep === 'program'
      ? tOnboarding('program-step-description')
      : tOnboarding('session-step-description');
  };

  const renderFooter = () => {
    if (currentStep === 'program') {
      return (
        <Button
          onClick={handleProgramNext}
          disabled={!isProgramStepValid}
          className="w-full"
        >
          {tOnboarding('next')}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }

    return (
      <div className="flex gap-2 w-full">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('program')}
          className="flex-1"
        >
          {tOnboarding('back')}
        </Button>
        <Button onClick={handleComplete} className="flex-1">
          {tOnboarding('complete')}
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  const content = (
    <>
      {currentStep === 'program' && renderProgramStep()}
      {currentStep === 'session' && renderSessionStep()}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} dismissible={false}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{getStepTitle()}</DrawerTitle>
            <DrawerDescription>{getStepDescription()}</DrawerDescription>
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
        className="sm:max-w-[500px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>{getStepDescription()}</DialogDescription>
        </DialogHeader>
        <div className="py-4">{content}</div>
        <DialogFooter>{renderFooter()}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
