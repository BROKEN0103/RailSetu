import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
  {
    variants: {
      variant: {
        info: 'bg-secondary/10 border-secondary/20 text-secondary [&>svg]:text-secondary',
        success: 'bg-success/10 border-success/20 text-success [&>svg]:text-success',
        warning: 'bg-warning/10 border-warning/20 text-warning [&>svg]:text-warning',
        error: 'bg-error/10 border-error/20 text-error [&>svg]:text-error',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  onDismiss?: () => void;
}

export function Alert({
  className,
  variant,
  title,
  description,
  children,
  onDismiss,
  ...props
}: AlertProps) {
  const Icon = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
  }[variant || 'info'];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className, onDismiss ? 'pr-12' : '')}
      {...props}
    >
      <Icon className="h-5 w-5" />
      <div className="flex flex-col gap-1">
        {title && <h5 className="font-medium leading-none tracking-tight">{title}</h5>}
        {(description || children) && (
          <div className="text-sm opacity-90 leading-relaxed">
            {description}
            {children}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
