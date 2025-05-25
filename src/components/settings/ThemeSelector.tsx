'use client';

import type { ThemeColors, ThemeMode } from '@/types/themes';
import { useTheme } from '@/hooks/useTheme';
import { COLORS_BY_MODE, getButtonBgStyle, getPrincipalColors } from '@/utils/themeUtils';

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  const themePresets = Object.entries(COLORS_BY_MODE).flatMap(([mode, colors]) =>
    colors.map(color => ({
      mode: mode as ThemeMode,
      color: color as ThemeColors,
      label: `${mode === 'light' ? 'Light' : 'Dark'} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
    })),
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {themePresets.map((preset) => {
          const isSelected
            = theme.mode === preset.mode && theme.color === preset.color;

          const bgClass = getButtonBgStyle(preset.color, preset.mode);
          const textColor = preset.mode === 'dark' ? 'text-white' : 'text-gray-900';
          const principalColors = getPrincipalColors(preset.color, preset.mode);
          const themeId = `${preset.color}-${preset.mode}`;

          return (
            <button
              key={`${preset.mode}-${preset.color}`}
              type="button"
              onClick={() => {
                setTheme({
                  mode: preset.mode,
                  color: preset.color,
                });
              }}
              className={`
                px-4 py-2 rounded-md transition-all duration-200 w-full
                ${bgClass} ${textColor} relative
                ${isSelected ? 'ring-2 ring-offset-2 ring-primary' : 'hover:brightness-110'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                flex flex-col items-center justify-center
              `}
              aria-label={`Select ${preset.label} theme`}
              data-testid={`theme-option-${themeId}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-1 mb-1">
                {principalColors.map(color => (
                  <div
                    key={`${preset.color}-${preset.mode}-${color.replace('#', '')}`}
                    className="size-3 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
