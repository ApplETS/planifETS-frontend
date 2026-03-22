import { describe, expect, it } from 'vitest';

import { formatProgramLabel } from '@/utils/programUtils';

describe('formatProgramLabel', () => {
  it('formats labels with the program code before the title', () => {
    expect(formatProgramLabel({
      code: '7084',
      title: 'BAC logiciel',
    })).toBe('7084 - BAC logiciel');
  });

  it('falls back to the available field when code or title is missing', () => {
    expect(formatProgramLabel({
      code: '7084',
      title: '',
    })).toBe('7084');

    expect(formatProgramLabel({
      code: '',
      title: 'BAC logiciel',
    })).toBe('BAC logiciel');
  });
});
