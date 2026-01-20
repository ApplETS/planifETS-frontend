'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/shadcn/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shadcn/ui/command';

type Option = {
  value: number;
  label: string;
  id: number;
  code?: string;
};

export type MultiSelectProps = {
  options: Option[];
  selected: Option[];
  onChangeAction: (selected: Option[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  selected,
  onChangeAction,
  placeholder,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback(
    (option: Option) => {
      onChangeAction(selected.filter((s) => s.value !== option.value));
    },
    [selected, onChangeAction],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            onChangeAction(selected.slice(0, -1));
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selected, onChangeAction],
  );

  const selectables = options.filter(
    (option) => !selected.some((s) => s.value === option.value),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent select-none"
    >
      <div
        className="group rounded-md border border-input ring-offset-background
        text-sm text-foreground
        px-3 py-2 w-full max-w-full select-none"
        style={{ boxSizing: 'border-box' }}
      >
        <div className="flex flex-wrap gap-1 w-full">
          {selected.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="text-foreground font-semibold py-1"
              data-testid={`program-chip-${option.id}`}
            >
              {option.label || option.value || 'No name'}
              <button
                type="button"
                name="remove-option"
                className="ml-1 rounded-full outline-none ring-offset-background
                focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder || 'Select options...'}
            className="ml-2 flex-1 bg-transparent text-foreground text-xs outline-none"
            style={{ width: 'auto', minWidth: 0 }}
          />
        </div>
      </div>
      <div className="relative mt-2 w-full">
        <CommandList>
          {open && selectables.length > 0
            ? (
              <div
                className="absolute top-0 w-full rounded-md border bg-popover text-popover-foreground
                shadow-md outline-none animate-in"
              >
                <CommandGroup className="max-h-80 overflow-auto">
                  {selectables.map((option) => (
                    <CommandItem
                      role="option"
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        onChangeAction([...selected, option]);
                      }}
                      className="cursor-pointer text-foreground"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )
            : null}
        </CommandList>
      </div>
    </Command>
  );
}
