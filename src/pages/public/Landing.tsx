import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, TicketCheck, Shield, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
// Assuming these exist in UI
// import { StationInput } from '@/components/ui/StationInput';
// import { DatePicker } from '@/components/ui/DatePicker';

export function Landing() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Travel smarter. Book your journey with confidence.
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Search trains, choose your seat, manage your bookings — all from one secure platform.
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-surface text-foreground shadow-2xl p-1 rounded-xl">
              <CardContent className="p-4 md:p-6">
                <div className="flex gap-2 mb-6 bg-background p-1 rounded-lg w-max">
                  <button
                    onClick={() => setTripType('one-way')}
                    className={cn("px-4 py-2 text-sm font-medium rounded-md transition-all", tripType === 'one-way' ? "bg-surface shadow-sm text-primary" : "text-muted-foreground")}
                  >
                    One Way
                  </button>
                  <button
                    onClick={() => setTripType('round-trip')}
                    className={cn("px-4 py-2 text-sm font-medium rounded-md transition-all", tripType === 'round-trip' ? "bg-surface shadow-sm text-primary" : "text-muted-foreground")}
                  >
                    Round Trip
                  </button>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <Input placeholder="From Station" defaultValue="Mumbai Central" />
                    <button type="button" className="p-2 rounded-full bg-background hover:bg-muted/20 text-muted-foreground mx-auto">
                      <ArrowLeftRight className="h-5 w-5" />
                    </button>
                    <Input placeholder="To Station" defaultValue="Pune Junction" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                    <Input type="date" className="md:col-span-1" defaultValue="2026-10-15" />
                    {tripType === 'round-trip' && (
                      <Input type="date" className="md:col-span-1" />
                    )}
                    
                    <Select
                      options={[
                        { value: '1A', label: 'AC First (1A)' },
                        { value: '2A', label: 'AC 2 Tier (2A)' },
                        { value: '3A', label: 'AC 3 Tier (3A)' },
                        { value: 'SL', label: 'Sleeper (SL)' },
                        { value: 'CC', label: 'Chair Car (CC)' },
                        { value: '2S', label: 'Second Sitting (2S)' },
                      ]}
                      className={tripType === 'round-trip' ? 'md:col-span-1' : 'md:col-span-2'}
                      value="3A"
                    />
                    
                    <Select
                      options={Array.from({ length: 6 }, (_, i) => ({ value: `${i+1}`, label: `${i+1} Passenger${i>0?'s':''}` }))}
                      className="md:col-span-1"
                      value="1"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-4 bg-accent hover:bg-accent-light text-primary-dark font-bold text-lg">
                    SEARCH TRAINS
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { from: 'Mumbai', to: 'Pune', fare: '₹150', duration: '3h 15m', count: '24 Trains' },
              { from: 'Delhi', to: 'Jaipur', fare: '₹340', duration: '4h 30m', count: '18 Trains' },
              { from: 'Mumbai', to: 'Ahmedabad', fare: '₹420', duration: '6h 45m', count: '15 Trains' },
              { from: 'Pune', to: 'Goa', fare: '₹560', duration: '12h 00m', count: '8 Trains' },
            ].map((route, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/search')}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-lg">{route.from}</span>
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-lg">{route.to}</span>
                  </div>
                  <div className="flex justify-between items-end mt-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting from</p>
                      <p className="text-xl font-bold text-accent">{route.fare}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{route.duration}</p>
                      <p className="text-xs text-muted-foreground">{route.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-dark">Why Choose RailConnect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <TicketCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-muted-foreground text-sm">Book tickets in just a few clicks with our streamlined booking process.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">Multiple payment options with bank-grade security for every transaction.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time PNR Status</h3>
              <p className="text-muted-foreground text-sm">Track your booking status in real-time with instant PNR updates.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple Cancellation</h3>
              <p className="text-muted-foreground text-sm">Easy cancellation with transparent refund policies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-accent-light">500+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Trains</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-accent-light">2000+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Stations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-accent-light">1M+</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Happy Passengers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-accent-light">99.9%</div>
              <div className="text-sm uppercase tracking-wider opacity-80">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
