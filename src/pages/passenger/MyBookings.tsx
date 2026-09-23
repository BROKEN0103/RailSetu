import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Train, Download, Eye, XCircle, ArrowRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal'; // Assuming this exists or I will just simulate it
import { cn } from '@/lib/utils';

export function MyBookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const mockBookings = [
    {
      id: 'BKG12345', pnr: '4827195631', trainNo: '12127', trainName: 'Intercity Express',
      date: '2026-10-15', from: 'Mumbai (MMCT)', to: 'Pune (PUNE)',
      status: 'CONFIRMED', amount: 1640, type: 'upcoming',
      passengers: 2, classes: '3A'
    },
    {
      id: 'BKG09876', pnr: '8573921045', trainNo: '12951', trainName: 'Mumbai Rajdhani',
      date: '2026-09-01', from: 'Mumbai (BCT)', to: 'New Delhi (NDLS)',
      status: 'COMPLETED', amount: 3200, type: 'completed',
      passengers: 1, classes: '2A'
    },
    {
      id: 'BKG54321', pnr: '1928374650', trainNo: '22119', trainName: 'Tejas Express',
      date: '2026-08-15', from: 'Mumbai (CSTM)', to: 'Goa (MAO)',
      status: 'CANCELLED', amount: 1850, type: 'cancelled',
      passengers: 1, classes: 'CC'
    }
  ];

  const filteredBookings = mockBookings.filter(b => b.type === activeTab);

  const handleCancelClick = (booking: any) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-primary mb-8">My Bookings</h1>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {[
          { id: 'upcoming', label: 'Upcoming Journey' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-6 py-3 font-medium text-sm transition-colors border-b-2",
              activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-lg border border-border">
            <Train className="w-16 h-16 text-muted mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No {activeTab} bookings found</h3>
            {activeTab === 'upcoming' && (
              <Button className="mt-4" onClick={() => window.location.href='/'}>Plan a Journey</Button>
            )}
          </div>
        ) : (
          filteredBookings.map(booking => (
            <Card key={booking.id} className="p-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5 flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded border border-border">PNR: {booking.pnr}</span>
                    <Badge variant="outline" className={cn(
                      "text-xs font-bold",
                      booking.status === 'CONFIRMED' || booking.status === 'COMPLETED' ? "border-green-200 bg-green-50 text-green-700" :
                      "border-red-200 bg-red-50 text-red-700"
                    )}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg text-primary">{booking.trainNo} {booking.trainName}</h3>
                  
                  <div className="flex items-center gap-3 mt-3 text-sm">
                    <div className="font-semibold">{booking.from}</div>
                    <ArrowRight className="w-4 h-4 text-muted" />
                    <div className="font-semibold">{booking.to}</div>
                  </div>
                  <div className="text-sm text-muted mt-1">
                    {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    <span className="mx-2">•</span> {booking.classes} Class <span className="mx-2">•</span> {booking.passengers} Passenger(s)
                  </div>
                </div>
                
                <div className="flex flex-col justify-between items-end md:w-48 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                  <div className="text-lg font-bold text-foreground mb-4 flex items-center">
                    <IndianRupee className="w-4 h-4" /> {booking.amount}
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Link to={`/bookings/${booking.id}`}>
                      <Button variant="outline" className="w-full text-xs h-8">
                        <Eye className="w-3 h-3 mr-2" /> View Details
                      </Button>
                    </Link>
                    
                    {booking.type === 'upcoming' && (
                      <>
                        <Button className="w-full text-xs h-8">
                          <Download className="w-3 h-3 mr-2" /> Download
                        </Button>
                        <Button variant="outline" className="w-full text-xs h-8 border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleCancelClick(booking)}>
                          <XCircle className="w-3 h-3 mr-2" /> Cancel Ticket
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" /> Cancel Ticket?
            </h2>
            <p className="text-sm text-muted mb-6">Are you sure you want to cancel the ticket for {selectedBooking.trainName} (PNR: {selectedBooking.pnr})?</p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-border mb-6 text-sm">
              <div className="flex justify-between mb-2">
                <span>Total Fare Paid:</span>
                <span className="font-semibold">₹{selectedBooking.amount}</span>
              </div>
              <div className="flex justify-between mb-2 text-red-600">
                <span>Cancellation Charges:</span>
                <span className="font-semibold">- ₹120</span>
              </div>
              <div className="h-px bg-border my-2"></div>
              <div className="flex justify-between font-bold text-green-700">
                <span>Refund Amount:</span>
                <span>₹{selectedBooking.amount - 120}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted mb-6 italic">Refund will be credited to the original payment source within 3-5 business days.</p>
            
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setCancelModalOpen(false)}>Keep Booking</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setCancelModalOpen(false)}>Confirm Cancellation</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
