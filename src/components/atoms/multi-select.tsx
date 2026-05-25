'use client';

import { CommandEmpty, Command as CommandPrimitive } from 'cmdk';
import { Search, X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/shadcn/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shadcn/ui/command';

type Option = {
  value: number;
  label: string;
  id: number;
  code?: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: Option[];
  onChangeAction: (selected: Option[]) => void;
  placeholder?: string;
  emptyStateMessage: string;
};

export function MultiSelect({
  options,
  selected,
  onChangeAction,
  placeholder,
  emptyStateMessage,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselectOption = React.useCallback(
    (option: Option) => {
      onChangeAction(selected.filter((s) => s.value !== option.value));
    },
    [selected, onChangeAction],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          onChangeAction(selected.slice(0, -1));
        }
      }

      if (e.key === 'Escape') {
        input.blur();
        setOpen(false);
      }

      // Keyboard open (intentional)
      if ((e.key === 'Enter' || e.key === 'ArrowDown') && !open) {
        setOpen(true);
      }
    },
    [selected, onChangeAction, open],
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
        className="group flex flex-wrap items-center gap-2 rounded-md border border-border bg-background
        px-3 py-1.5 min-h-10 w-full max-w-full select-none"
        style={{ boxSizing: 'border-box' }}
        // Open ONLY on pointer interaction (click/tap) on the control.
        onPointerDown={(e) => {
          // If user clicks the wrapper, treat it as intent to open and focus the input.
          // (The remove button already stops propagation, so it won't trigger this.)
          if (e.pointerType !== 'mouse' || (e as any).button === 0) {
            setOpen(true);
            // Ensure the input gets focus when clicking anywhere on the control.
            queueMicrotask(() => inputRef.current?.focus());
          }
        }}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selected.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="flex items-center gap-1 text-foreground font-semibold py-1 rounded-lg"
              data-testid={`program-chip-${option.id}`}
            >
              <span>{option.label || option.value || 'No name'}</span>
              <button
                type="button"
                name="remove-option"
                aria-label={`Remove ${option.label || option.value}`}
                title={`Remove ${option.label || option.value}`}
                className="py-0.5 outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselectOption(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselectOption(option)}
              >
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          <div className="flex items-center gap-2 flex-1 ml-1">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              // Typing is user intent: open the list if it’s closed.
              onValueChange={(v) => {
                setInputValue(v);
                if (!open) {
                  setOpen(true);
                }
              }}
              // Do NOT open on focus (prevents auto-open from Dialog/Drawer autofocus)
              onBlur={() => setOpen(false)}
              placeholder={placeholder ?? 'Select options...'}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              style={{ width: 'auto', minWidth: 0 }}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-1 w-full">
        <CommandList>
          {open && selectables.length > 0
            ? (
              <div
                className="absolute top-0 z-50 w-full overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md outline-none animate-in"
              >
                <CommandGroup className="max-h-80 overflow-auto">
                  {selectables.map((option) => (
                    <CommandItem
                      role="option"
                      key={option.value}
                      className="px-4 py-2.5"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        onChangeAction([...selected, option]);
                        setOpen(false);
                        inputRef.current?.blur();
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandEmpty
                  className="py-3 text-center text-sm text-muted-foreground"
                  data-testid="no-options-message"
                >
                  {emptyStateMessage}
                </CommandEmpty>
              </div>
            )
            : null}
        </CommandList>
      </div>
    </Command>
  );
}
