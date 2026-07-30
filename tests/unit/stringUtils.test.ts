import { describe, expect, it } from 'vitest';

import { normalizeSearchText } from '@/utils/stringUtil';

describe('normalizeSearchText', () => {
  it('makes search text case- and accent-insensitive', () => {
    expect(normalizeSearchText('École Maîtrise')).toBe('ecole maitrise');
  });
});
