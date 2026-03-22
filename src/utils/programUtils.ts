import type { ProgramDto } from '@/api/types/program';

export function formatProgramLabel(program: Pick<ProgramDto, 'code' | 'title'>): string {
  const code = program.code?.trim();
  const title = program.title?.trim();

  if (code && title) {
    return `${code} - ${title}`;
  }

  return title || code || '';
}
