import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Ticket, Settings, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Book Tickets', href: '/search' },
    { label: 'PNR Status', href: '/pnr' },
    { label: 'Trains', href: '/trains' },
    { label: 'Help', href: '/help' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo size="md" />
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 focus:outline-none rounded-full p-1 hover:bg-background">
                  <Avatar alt={user?.name || 'User'} size="sm" />
                  <span className="text-sm font-medium hidden lg:block">{user?.name}</span>
                </button>
              }
              items={[
                ...(user?.role === 'admin'
                  ? [
                      {
                        label: 'Admin Portal',
                        icon: <Shield className="h-4 w-4 text-accent" />,
                        onClick: () => navigate('/admin'),
                      },
                    ]
                  : []),
                {
                  label: 'My Bookings',
                  icon: <Ticket className="h-4 w-4" />,
                  onClick: () => navigate('/bookings'),
                },
                {
                  label: 'Profile',
                  icon: <User className="h-4 w-4" />,
                  onClick: () => navigate('/profile'),
                },
                {
                  label: 'Settings',
                  icon: <Settings className="h-4 w-4" />,
                  onClick: () => navigate('/settings'),
                },
                {
                  label: 'Logout',
                  icon: <LogOut className="h-4 w-4" />,
                  onClick: handleLogout,
                  className: 'text-error hover:bg-error/10 hover:text-error',
                },
              ]}
              align="end"
            />
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-surface border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-4 py-2 rounded-md hover:bg-background text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border pt-4 px-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="flex items-center gap-2 py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}><Ticket className="h-4 w-4" /> My Bookings</Link>
                <Link to="/profile" className="flex items-center gap-2 py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}><User className="h-4 w-4" /> Profile</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm text-error text-left"><LogOut className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" className="w-full justify-center" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Login</Button>
                <Button className="w-full justify-center" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>Register</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
