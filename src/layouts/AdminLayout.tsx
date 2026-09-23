import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Train, MapPin, Calendar, 
  Ticket, Users, IndianRupee, FileText, 
  ShieldAlert, Settings, LogOut, Menu, X, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/layout/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/trains', icon: Train, label: 'Trains' },
    { to: '/admin/stations', icon: MapPin, label: 'Stations' },
    { to: '/admin/schedules', icon: Calendar, label: 'Schedules' },
    { to: '/admin/bookings', icon: Ticket, label: 'Bookings' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/fares', icon: IndianRupee, label: 'Fares' },
    { to: '/admin/reports', icon: FileText, label: 'Reports' },
    { to: '/admin/audit', icon: ShieldAlert, label: 'Audit Logs' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      <div className={cn("h-16 flex items-center border-b border-border px-4", isSidebarOpen ? "justify-between" : "justify-center")}>
        {isSidebarOpen ? (
          <Logo size="sm" />
        ) : (
          <Train className="h-6 w-6 text-primary" />
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-background hover:text-foreground",
                  !isSidebarOpen && "justify-center px-0"
                )
              }
              title={!isSidebarOpen ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        {isSidebarOpen ? (
          <Button variant="outline" className="w-full justify-start text-error hover:text-error hover:bg-error/10" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <button onClick={handleLogout} className="p-2 w-full flex justify-center text-error rounded-md hover:bg-error/10" title="Logout">
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:block transition-all duration-300 z-20 shrink-0",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 md:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-background text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block p-2 rounded-md hover:bg-background text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block text-sm font-medium text-muted-foreground">
              Admin Portal
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-background text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error"></span>
            </button>
            
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar alt={user?.name || 'Admin'} size="sm" />
                  <span className="text-sm font-medium hidden sm:block">{user?.name || 'Admin'}</span>
                </button>
              }
              items={[
                { label: 'Profile Settings', onClick: () => navigate('/admin/settings') },
                { label: 'Logout', onClick: handleLogout, className: 'text-error' },
              ]}
              align="end"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
