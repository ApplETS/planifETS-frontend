'use client';

import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shadcn/lib/utils';
import { Button } from '@/shadcn/ui/button';

type NumberFieldProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
} & Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'type' | 'readOnly'>;

const NumberField = ({ ref, value, onChange, min, max, step = 1, className, id, name, 'aria-labelledby': ariaLabelledby, ...props }: NumberFieldProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const canDecrement = min === undefined || value - step >= min;
  const canIncrement = max === undefined || value + step <= max;

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-9 w-full items-stretch overflow-hidden rounded-md border border-input bg-background shadow-xs',
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full shrink-0 rounded-none rounded-l-md border-r border-input focus-visible:z-10"
        onClick={() => canDecrement && onChange(value - step)}
        disabled={!canDecrement}
        aria-label="Decrement"
        tabIndex={-1}
      >
        <Minus className="size-4" />
      </Button>

      <input
        id={id}
        name={name}
        type="number"
        value={value}
        readOnly
        min={min}
        max={max}
        aria-labelledby={ariaLabelledby}
        className="w-full min-w-0 flex-1 cursor-default bg-transparent py-2 text-center text-sm text-foreground focus-visible:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full shrink-0 rounded-none rounded-r-md border-l border-input focus-visible:z-10"
        onClick={() => canIncrement && onChange(value + step)}
        disabled={!canIncrement}
        aria-label="Increment"
        tabIndex={-1}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

NumberField.displayName = 'NumberField';

export { NumberField };
