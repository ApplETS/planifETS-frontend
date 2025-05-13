'use client';

import { useTheme } from 'next-themes';

export function ThemeSelector() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const current = theme === 'system' ? resolvedTheme : theme;

  return (
    <select
      value={current}
      onChange={e => setTheme(e.target.value)}
      className="p-2 rounded-md border border-border
        bg-secondary text-foreground
        hover:bg-secondary-hover focus:outline-none"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
