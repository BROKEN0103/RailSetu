import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Shield, Edit2, LogOut, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function Profile() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Profile Section */}
      <Card className="p-6 md:p-8 mb-8 bg-gradient-to-r from-primary to-primary-dark text-surface border-none shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-4xl font-bold shadow-inner border-4 border-white/20">
            R
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-1">Rahul Sharma</h1>
            <p className="text-blue-200 mb-4">rahul.sharma@example.com</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +91 9876543210</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Member since Jan 2024</span>
            </div>
          </div>
          <Button variant="outline" className="text-foreground bg-surface border-transparent hover:bg-gray-100 flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Vertical Tabs / Nav (Simulated for this view) */}
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-primary font-bold border-l-4 border-primary">
            Personal Info
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-muted hover:bg-gray-50 font-medium">
            Saved Passengers
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-muted hover:bg-gray-50 font-medium">
            Security & Login
          </button>
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Personal Information</h2>
              <Button variant="ghost" size="sm" className="text-secondary"><Edit2 className="w-4 h-4 mr-2" /> Edit</Button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Full Name</label>
                  <Input defaultValue="Rahul Sharma" readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Email Address</label>
                  <Input defaultValue="rahul.sharma@example.com" readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Mobile Number</label>
                  <Input defaultValue="+91 9876543210" readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Date of Birth</label>
                  <Input type="date" defaultValue="1994-05-15" readOnly className="bg-gray-50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Address</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  defaultValue="123, Sunrise Apartments, Andheri West, Mumbai, Maharashtra - 400053"
                  readOnly
                />
              </div>
              
              <div className="flex justify-end pt-4 border-t border-border">
                <Button disabled>Save Changes</Button>
              </div>
            </form>
          </Card>
          
          <Card className="p-6 bg-blue-50/50 border-blue-100">
            <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2"><Shield className="w-5 h-5" /> Account Verification</h3>
            <p className="text-sm text-muted mb-4">Verify your KYC to book up to 12 tickets per month instead of 6.</p>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Aadhaar Verified
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
