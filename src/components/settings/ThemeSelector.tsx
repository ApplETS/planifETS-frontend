'use client';

import type { ThemeColors } from '@/types/themes';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { Moon, Palette, Sun } from 'lucide-react';
import React, { useEffect } from 'react';

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  const lightModeColors: ThemeColors[] = [
    'zinc',
    'rose',
    'green',
    'orange',
    'blue',
    'red',
  ];

  const darkModeColors: ThemeColors[] = [
    'zinc',
    'rose',
    'blue',
    'violet',
    'yellow',
  ];

  const colors = theme.mode === 'dark' ? darkModeColors : lightModeColors;

  useEffect(() => {
    const doc = document.documentElement;
    doc.setAttribute('data-theme', `${theme.color}-${theme.mode}`);

    if (theme.mode === 'dark') {
      doc.classList.add('dark');
    } else {
      doc.classList.remove('dark');
    }
  }, [theme]);

  const toggleMode = () => {
    // When changing modes, select an appropriate color for the new mode
    const newMode = theme.mode === 'light' ? 'dark' : 'light';
    const availableColors = newMode === 'dark' ? darkModeColors : lightModeColors;

    setTheme({
      mode: newMode,
      color: availableColors.includes(theme.color) ? theme.color : availableColors[0]!,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-full titlebar-button focus-visible:ring-0 bg-transparent hover:bg-transparent
          border-0 hover:brightness-150 hover:shadow-none hover:border-0 duration-500
          ease-in-out transition-all relative"
        onClick={toggleMode}
        data-testid="theme-toggle-button"
      >
        <Sun
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-foreground
            dark:-rotate-90 dark:scale-0"
        />
        <Moon
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0
            dark:scale-100 text-foreground"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-full titlebar-button focus-visible:ring-0 bg-transparent hover:bg-transparent
              border-0 hover:brightness-150 hover:shadow-none hover:border-0 duration-500
              ease-in-out transition-all"
            data-testid="theme-color-button"
          >
            <Palette className="h-[1.2rem] w-[1.2rem] text-foreground" />
            <span className="sr-only">Select theme color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-[9999] bg-background border border-border shadow-lg min-w-[160px] p-0"
        >
          {colors.map((color, index) => (
            <React.Fragment key={color}>
              <DropdownMenuItem
                onClick={() => {
                  setTheme({
                    mode: theme.mode,
                    color,
                  });
                }}
                className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-muted m-0"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getColorHex(color) }}
                />
                <span className="capitalize">{color}</span>
                {theme.color === color && (
                  <span className="ml-auto text-xs text-muted-foreground">✓</span>
                )}
              </DropdownMenuItem>
              {index < colors.length - 1 && (
                <div className="h-px bg-border w-full mx-0" />
              )}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function getColorHex(color: ThemeColors): string {
  const colorMap: Record<ThemeColors, string> = {
    zinc: '#71717a',
    rose: '#f43f5e',
    blue: '#3b82f6',
    green: '#22c55e',
    orange: '#f97316',
    red: '#ef4444',
    yellow: '#eab308',
    violet: '#8b5cf6',
  };

  return colorMap[color] || '#71717a';
}
