'use client';

import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select';
import { formatProgramLabel } from '@/utils/programUtils';

type ProgramListItem = {
  programId: number;
  programCode: string;
  programTitle: string;
};

type ProgramSelectorProps = {
  availablePrograms: ProgramListItem[];
  selectedProgramId: number | null;
  isLoading: boolean;
  error?: string | null;
  onProgramChange: (nextProgramId: string) => void;
};

const STATE_BLOCK_STYLES = 'rounded-2xl border p-5 text-sm';

const ProgramSelector = ({
  availablePrograms,
  selectedProgramId,
  isLoading,
  error,
  onProgramChange,
}: ProgramSelectorProps) => {
  const t = useTranslations('CourseDetailsPage');

  return (
    <section className="bg-muted/30 p-6">
      <p className="text-sm font-medium text-foreground">{t('selectProgramLabel')}</p>

      <div className="mt-2">
        <Select
          value={selectedProgramId?.toString() ?? ''}
          onValueChange={onProgramChange}
          disabled={isLoading || availablePrograms.length === 0}
        >
          <SelectTrigger
            className="w-full"
            aria-label={t('selectProgramLabel')}
            data-testid="course-details-program-select"
          >
            <SelectValue
              placeholder={isLoading ? t('loadingPrograms') : t('selectProgramPlaceholder')}
            />
          </SelectTrigger>
          <SelectContent>
            {availablePrograms.map((program) => (
              <SelectItem key={program.programId} value={program.programId.toString()}>
                {formatProgramLabel({
                  code: program.programCode,
                  title: program.programTitle,
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error
        ? (
          <div className={`${STATE_BLOCK_STYLES} mt-4 border-destructive/20 bg-destructive/5 text-destructive`}>
            {error}
          </div>
        )
        : null}

      {!isLoading && availablePrograms.length === 0 && !error
        ? (
          <div className={`${STATE_BLOCK_STYLES} mt-4 border-border/70 bg-background text-muted-foreground`}>
            {t('noPrograms')}
          </div>
        )
        : null}

      {!isLoading && !error && availablePrograms.length > 0 && !selectedProgramId
        ? (
          <div className={`${STATE_BLOCK_STYLES} mt-4 border-border/70 bg-orange-300/60 text-foreground`}>
            {t('invalidProgram')}
          </div>
        )
        : null}
    </section>
  );
};

export default ProgramSelector;
