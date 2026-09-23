import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80 border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="bg-white inline-block p-2 rounded-md">
              <Logo size="md" />
            </div>
            <p className="text-sm mt-4 leading-relaxed text-white/70">
              Your trusted partner for national railway reservations, offering seamless booking, real-time tracking, and reliable support.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="hover:text-accent transition-colors">Book Tickets</Link></li>
              <li><Link to="/pnr" className="hover:text-accent transition-colors">PNR Status</Link></li>
              <li><Link to="/trains" className="hover:text-accent transition-colors">Live Train Status</Link></li>
              <li><Link to="/schedules" className="hover:text-accent transition-colors">Train Schedules</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cancellation" className="hover:text-accent transition-colors">Cancellation Rules</Link></li>
              <li><Link to="/refunds" className="hover:text-accent transition-colors">Refund Status</Link></li>
              <li><Link to="/premium" className="hover:text-accent transition-colors">Premium Tatkal</Link></li>
              <li><Link to="/tourist" className="hover:text-accent transition-colors">Tourist Packages</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link to="/feedback" className="hover:text-accent transition-colors">Give Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} RailConnect National Railway System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/security" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
