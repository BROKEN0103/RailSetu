import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, helperText, value, ...props }, ref) => {
    // Basic date picker relying on native browser support.
    
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1.5 text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="date"
            className={cn(
              'flex h-10 w-full rounded-md border bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 pr-10',
              error ? 'border-error focus-visible:ring-error' : 'border-border focus-visible:ring-primary',
              className
            )}
            value={value}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
            <Calendar size={16} />
          </div>
        </div>
        {(error || helperText) && (
          <p className={cn('mt-1 text-sm', error ? 'text-error' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
