import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(process.cwd(), 'src/components/Planner/CourseActionsMenu.tsx'),
  'utf8',
);

describe('CourseActionsMenu', () => {
  it('does not lock page scroll while the course actions dropdown is open', () => {
    expect(source).toMatch(/<DropdownMenu\s+modal=\{false\}>/);
  });
});
