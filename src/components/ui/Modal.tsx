import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md', className }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-[calc(100%-2rem)] h-[calc(100%-2rem)]',
  };

  const modalContent = (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6", className)}>
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={cn(
          'relative bg-surface rounded-lg shadow-xl flex flex-col w-full max-h-[calc(100vh-4rem)]',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={onClose}>
              <X size={18} />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        )}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end p-4 sm:p-6 border-t border-border space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
