import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, message, variant, duration = 5000 }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, variant, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full md:max-w-sm pointer-events-none">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onRemove, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onRemove]);

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[toast.variant];

  const variantClasses = {
    success: 'bg-success/10 border-success/20 text-success',
    error: 'bg-error/10 border-error/20 text-error',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    info: 'bg-secondary/10 border-secondary/20 text-secondary',
  }[toast.variant];

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full items-start space-x-4 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5',
        variantClasses
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="flex-1 space-y-1">
        {toast.title && <h3 className="font-medium text-foreground">{toast.title}</h3>}
        <p className="text-sm opacity-90">{toast.message}</p>
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
