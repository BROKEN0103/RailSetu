import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', text, className, fullScreen }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  const content = (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 
        size={sizeClasses[size]} 
        className="animate-spin text-primary" 
      />
      {text && (
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
