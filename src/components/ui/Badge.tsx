import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-muted text-muted-foreground',
        warning: 'border-transparent bg-warning/15 text-warning',
        confirmed: 'border-transparent bg-success/15 text-success',
        rac: 'border-transparent bg-warning/15 text-warning',
        waiting: 'border-transparent bg-secondary/15 text-secondary',
        cancelled: 'border-transparent bg-error/15 text-error',
        active: 'border-transparent bg-success/15 text-success',
        inactive: 'border-transparent bg-muted text-muted-foreground',
        delayed: 'border-transparent bg-warning/15 text-warning',
        success: 'border-transparent bg-success/15 text-success',
        error: 'border-transparent bg-error/15 text-error',
        secondary: 'border-transparent bg-secondary/15 text-secondary',
        primary: 'border-transparent bg-primary/15 text-primary',
        info: 'border-transparent bg-secondary/15 text-secondary',
        outline: 'border-border text-foreground',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

function Badge({ className, variant, size, showDot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showDot && (
        <span className="mr-1.5 flex h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
