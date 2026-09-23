import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
  className?: string;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
  align?: string;
}

export function Dropdown({ trigger, items, position = 'bottom-right', align, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const effectivePosition = align === 'right' || align === 'end' ? 'bottom-right' : (align === 'left' || align === 'start' ? 'bottom-left' : position);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-surface shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2",
            effectivePosition === 'bottom-right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) => {
              if (item.divider) {
                return <div key={`div-${index}`} className="my-1 h-px bg-border" />;
              }
              return (
                <button
                  key={item.id || item.label || index}
                  className={cn("w-full text-left flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors", item.className)}
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <span className="mr-2 text-muted-foreground">{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
