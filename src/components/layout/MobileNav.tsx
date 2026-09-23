import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Ticket, Hash, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/bookings', icon: Ticket, label: 'Bookings' },
    { to: '/pnr', icon: Hash, label: 'PNR' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border pb-safe z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <ul className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center h-full gap-1 text-xs transition-colors",
                  isActive ? "text-accent font-medium" : "text-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5", isActive && "fill-accent/20")} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
