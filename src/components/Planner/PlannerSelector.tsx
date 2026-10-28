'use client';

import type { ReactNode } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import BaseDialog from '@/components/dialogs/BaseDialog';
import { Button } from '@/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { Input } from '@/shadcn/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcn/ui/tooltip';
import { usePlannerStore } from '@/store/plannerStore';
import { SESSION_SELECTION_BOUNDS } from '@/utils/sessionUtil';

function PlannerNameTooltip({ name, children }: { readonly name: string; readonly children: ReactNode }) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      onOpenChange={(nextOpen) => {
        const label = triggerRef.current?.querySelector('.truncate');
        setOpen(nextOpen && !!label && label.scrollWidth > label.clientWidth);
      }}
    >
      <TooltipTrigger
        asChild
        onFocus={(event) => {
          if (!event.currentTarget.matches(':focus-visible')) {
            event.preventDefault();
          }
        }}
        ref={(element) => {
          triggerRef.current = element;
        }}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="end"
        sideOffset={4}
        className="max-w-[min(20rem,calc(100vw-1rem))] [overflow-wrap:anywhere]"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}

export default function PlannerSelector({ disabled }: { readonly disabled: boolean }) {
  const t = useTranslations('Planners');
  const {
    activePlannerId,
    inactivePlanners,
    name,
    createPlanner,
    switchPlanner,
    getYears,
  } = usePlannerStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [currentYear] = useState(() => new Date().getFullYear());
  const minYear = currentYear - SESSION_SELECTION_BOUNDS.PAST_YEARS;
  const maxYear = currentYear + SESSION_SELECTION_BOUNDS.FUTURE_YEARS;

  const [startYear, setStartYear] = useState(currentYear);

  const activeName
    = activePlannerId === 'default' && name === 'Default Planner'
      ? t('default-name')
      : name;
  const planners = [
    { id: activePlannerId, name },
    ...Object.entries(inactivePlanners).map(([id, planner]) => ({
      id,
      name: planner.name,
    })),
  ].sort((a, b) => {
    if (a.id === 'default') {
      return -1;
    }
    if (b.id === 'default') {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  const openCreateDialog = () => {
    setNewName('');
    setStartYear(Math.max(minYear, Math.min(maxYear, getYears()[0] ?? currentYear)));
    setIsOpen(true);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <PlannerNameTooltip name={activeName}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-full min-w-0 shrink-0 justify-between gap-1 border border-border bg-background px-2 text-muted-foreground lg:h-auto lg:w-44 lg:max-w-[40%]"
              aria-label={t('label')}
              disabled={disabled}
              data-testid="planner-select"
              data-print-hidden="true"
            >
              <span className="truncate">{activeName}</span>
              <ChevronDown className="size-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
        </PlannerNameTooltip>
        <DropdownMenuContent
          align="end"
          className="w-64 max-w-[calc(100vw-1rem)]"
          onCloseAutoFocus={(event) => {
            if (isOpen) {
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuRadioGroup
            value={activePlannerId}
            onValueChange={switchPlanner}
            aria-label={t('label')}
          >
            {planners.map((planner) => {
              const plannerName
                = planner.id === 'default' && planner.name === 'Default Planner'
                  ? t('default-name')
                  : planner.name;
              return (
                <PlannerNameTooltip key={planner.id} name={plannerName}>
                  <DropdownMenuRadioItem value={planner.id}>
                    <span className="truncate">{plannerName}</span>
                  </DropdownMenuRadioItem>
                </PlannerNameTooltip>
              );
            })}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={openCreateDialog} data-testid="add-planner">
            <Plus className="size-4" />
            {t('add')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BaseDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('add')}
        description={t('description')}
        footerActions={(
          <Button
            type="submit"
            form="new-planner-form"
            disabled={!newName.trim() || disabled}
          >
            {t('create')}
          </Button>
        )}
      >
        <form
          id="new-planner-form"
          className="space-y-4 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (disabled || !newName.trim()) {
              return;
            }
            createPlanner(newName, startYear);
            setIsOpen(false);
          }}
        >
          <div className="space-y-2">
            <label htmlFor="planner-name" className="text-sm font-medium">
              {t('name')}
            </label>
            <Input
              id="planner-name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder={t('name-placeholder')}
              maxLength={80}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="planner-start-year" className="text-sm font-medium">
              {t('start-year')}
            </label>
            <Input
              id="planner-start-year"
              type="number"
              value={Number.isNaN(startYear) ? '' : startYear}
              onChange={(event) => setStartYear(event.target.valueAsNumber)}
              min={minYear}
              max={maxYear}
              step={1}
              required
            />
          </div>
        </form>
      </BaseDialog>
    </>
  );
}
