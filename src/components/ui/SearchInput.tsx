import React, { useState, useEffect, forwardRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from './Input';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  debounceMs?: number;
  isLoading?: boolean;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onChange, debounceMs = 300, isLoading, value: externalValue, onClear, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(externalValue?.toString() || '');

    useEffect(() => {
      if (externalValue !== undefined) {
        setLocalValue(externalValue.toString());
      }
    }, [externalValue]);

    useEffect(() => {
      const handler = setTimeout(() => {
        if (externalValue !== localValue) {
          onChange(localValue);
        }
      }, debounceMs);

      return () => clearTimeout(handler);
    }, [localValue, debounceMs, onChange, externalValue]);

    const handleClear = () => {
      setLocalValue('');
      onChange('');
      onClear?.();
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Input
          ref={ref}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          leftIcon={<Search size={16} />}
          rightIcon={
            isLoading ? (
              <Loader2 className="animate-spin text-muted-foreground" size={16} />
            ) : localValue ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground focus:outline-none"
              >
                <X size={16} />
              </button>
            ) : null
          }
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
