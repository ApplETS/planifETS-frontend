'use client';

import { useTheme } from 'next-themes';

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={e => setTheme(e.target.value)}
      className="
        p-2
        rounded-md
        border
        border-[var(--color-navbarButton)]
        bg-[var(--color-navbarButton)]
        text-[var(--color-textLightBackground)]
        hover:bg-[var(--color-navbarButtonHover)]
        focus:outline-none"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
