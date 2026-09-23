import React from 'react';
import { Train } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: 'sm' | 'md' | 'full';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <Link to="/" className={cn("flex flex-col items-start gap-0.5", className)}>
      <div className="flex items-center gap-1.5">
        <Train
          className={cn(
            "text-primary",
            size === 'sm' && "h-5 w-5",
            size === 'md' && "h-6 w-6",
            size === 'full' && "h-8 w-8"
          )}
        />
        <div
          className={cn(
            "font-black tracking-tight",
            size === 'sm' && "text-lg",
            size === 'md' && "text-xl",
            size === 'full' && "text-2xl"
          )}
        >
          <span className="text-primary-dark">RAIL</span>
          <span className="text-accent">CONNECT</span>
        </div>
      </div>
      {size === 'full' && (
        <span className="text-xs text-muted font-medium">
          National Railway Reservation & Management System
        </span>
      )}
    </Link>
  );
}
