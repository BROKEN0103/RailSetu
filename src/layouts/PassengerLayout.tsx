import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';

export function PassengerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <main className="flex-grow flex flex-col container mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
}
