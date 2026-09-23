import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

export function Avatar({ src, alt, name, initials, fallback, size = 'md', status, className }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusColor = {
    online: 'bg-success',
    offline: 'bg-muted',
    away: 'bg-warning',
    busy: 'bg-error',
  };

  const getInitials = (n?: string) => {
    if (initials) return initials;
    if (fallback) return fallback;
    if (!n) return '?';
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div 
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden bg-primary/10 text-primary font-semibold border border-border",
          sizeClasses[size]
        )}
      >
        {src && !imageError ? (
          <img 
            src={src} 
            alt={alt || name || "Avatar"} 
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-surface",
            statusColor[status],
            size === 'sm' ? 'h-2 w-2' : size === 'xl' ? 'h-4 w-4' : 'h-3 w-3'
          )} 
        />
      )}
    </div>
  );
}
