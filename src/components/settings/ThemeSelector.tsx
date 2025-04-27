'use client';

import { useTheme } from 'next-themes';

export function ThemeSelector() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const current = theme === 'system' ? resolvedTheme : theme;

  return (
    <select
      value={current}
      onChange={e => setTheme(e.target.value)}
      className="
        p-2
        rounded-md
        border
        border-[var(--color-navbarButton)]
        bg-[var(--color-navbarButton)]
        text-[var(--color-textLightBackground)]
        hover:bg-[var(--color-navbarButtonHover)]
        focus:outline-hidden"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
