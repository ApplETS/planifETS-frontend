'use client';

import type { ProgramListDto } from '@/api/types/program';

import { useTranslations } from 'next-intl';
import ProgramLabel from '@/components/atoms/ProgramLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { formatProgramLabel } from '@/utils/programUtil';

type ProgramSelectorProps = {
  availablePrograms: ProgramListDto[];
  selectedProgramId: number | null;
  isLoading: boolean;
  error?: string | null;
  onProgramChange: (nextProgramId: string) => void;
};

const STATE_BLOCK_STYLES = 'rounded-xl border p-5 text-sm';

const ProgramSelector = ({
  availablePrograms,
  selectedProgramId,
  isLoading,
  error,
  onProgramChange,
}: ProgramSelectorProps) => {
  const t = useTranslations('CourseDetailsPage');
  const selectedProgram = availablePrograms.find((program) => program.programId === selectedProgramId);

  return (
    <section className="min-w-0 bg-muted/30 p-6">
      <p className="text-sm font-medium text-foreground">{t('selectProgramLabel')}</p>

      {availablePrograms.length > 0 && (
        <Select
          value={selectedProgramId?.toString() ?? ''}
          onValueChange={onProgramChange}
          disabled={isLoading || availablePrograms.length === 0}
        >
          <SelectTrigger
            className="mt-2 w-full min-w-0 min-h-9 whitespace-normal data-[size=default]:h-auto *:data-[slot=select-value]:line-clamp-none"
            aria-label={t('selectProgramLabel')}
            data-testid="course-details-program-select"
          >
            <SelectValue
              className="min-w-0 flex-1 text-left"
              placeholder={isLoading ? t('loadingPrograms') : t('selectProgramPlaceholder')}
            >
              {selectedProgram && (
                <ProgramLabel text={formatProgramLabel({
                  code: selectedProgram.programCode,
                  title: selectedProgram.programTitle,
                })}
                />
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="start"
            className="w-(--radix-select-trigger-width) max-w-(--radix-select-content-available-width) scrollbar-thin"
          >
            {availablePrograms.map((program) => (
              <SelectItem key={program.programId} value={program.programId.toString()}>
                <ProgramLabel text={formatProgramLabel({
                  code: program.programCode,
                  title: program.programTitle,
                })}
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {error
        ? (
          <div className={`${STATE_BLOCK_STYLES} mt-4 border-destructive/20 bg-destructive/5 text-destructive`}>
            {error}
          </div>
        )
        : null}

      {!isLoading && availablePrograms.length === 0 && !error
        ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {t('noPrograms')}
          </p>
        )
        : null}
    </section>
  );
};

export default ProgramSelector;
