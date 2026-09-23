import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking data
  const booking = {
    pnr: '4827195631',
    status: 'CONFIRMED',
    trainNo: '12127',
    trainName: 'Intercity Express',
    date: '15 Oct 2026',
    from: 'Mumbai Central (MMCT)',
    fromTime: '06:40',
    to: 'Pune Junction (PUNE)',
    toTime: '10:15',
    class: 'AC 3 Tier (3A)',
    quota: 'General Quota',
    distance: '191 km',
    bookedOn: '02 Oct 2026, 14:30',
    passengers: [
      { name: 'Rahul Sharma', age: 32, gender: 'M', coach: 'B1', seat: '24', berth: 'Lower', status: 'CNF' },
      { name: 'Priya Sharma', age: 28, gender: 'F', coach: 'B1', seat: '25', berth: 'Middle', status: 'CNF' }
    ],
    fare: {
      base: 1400, res: 80, sf: 60, gst: 100, total: 1640
    },
    payment: {
      method: 'UPI', id: 'UPI9876543210', date: '02 Oct 2026'
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/bookings')} className="pl-0 hover:bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Bookings
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
            <Button variant="outline" size="sm"><Printer className="w-4 h-4 mr-2" /> Print</Button>
            <Button size="sm"><Download className="w-4 h-4 mr-2" /> E-Ticket</Button>
          </div>
        </div>

        <div className="bg-white shadow-md border border-border rounded-lg overflow-hidden">
          {/* Status Header */}
          <div className={cn(
            "px-6 py-4 flex justify-between items-center text-white",
            booking.status === 'CONFIRMED' ? "bg-green-600" : "bg-red-600"
          )}>
            <div>
              <div className="text-sm opacity-90 uppercase tracking-wider font-medium">Booking Status</div>
              <div className="text-2xl font-black">{booking.status}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 uppercase tracking-wider font-medium">PNR</div>
              <div className="text-2xl font-black">{booking.pnr}</div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Journey Header */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-xl font-bold text-primary">{booking.trainNo} {booking.trainName}</h2>
                  <p className="text-sm text-muted">{booking.class} | {booking.quota}</p>
                </div>
                <div className="text-right text-sm text-muted">
                  Booked on: {booking.bookedOn}
                </div>
              </div>

              <div className="bg-gray-50 border border-border rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left flex-1">
                  <div className="text-2xl font-bold text-primary">{booking.fromTime}</div>
                  <div className="font-semibold mt-1">{booking.from}</div>
                  <div className="text-sm text-muted">{booking.date}</div>
                </div>
                
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xs text-muted font-medium px-3 py-1 bg-white border border-border rounded-full mb-2">
                    {booking.distance}
                  </span>
                  <div className="w-full flex items-center">
                    <div className="h-px bg-border flex-1"></div>
                    <div className="w-2 h-2 rounded-full bg-border mx-1"></div>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                </div>
                
                <div className="text-center md:text-right flex-1">
                  <div className="text-2xl font-bold text-primary">{booking.toTime}</div>
                  <div className="font-semibold mt-1">{booking.to}</div>
                  <div className="text-sm text-muted">{booking.date}</div>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">Passenger Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-border text-muted text-sm">
                      <th className="p-3 font-semibold">Name</th>
                      <th className="p-3 font-semibold">Age/Sex</th>
                      <th className="p-3 font-semibold">Coach</th>
                      <th className="p-3 font-semibold">Seat/Berth</th>
                      <th className="p-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.passengers.map((p, idx) => (
                      <tr key={idx} className="border-b border-border">
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3">{p.age} / {p.gender}</td>
                        <td className="p-3 font-bold text-primary">{p.coach}</td>
                        <td className="p-3">{p.seat} ({p.berth})</td>
                        <td className="p-3 text-right">
                          <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">{p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid for Fare and Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">Fare Breakdown</h3>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-border">
                  <div className="flex justify-between"><span className="text-muted">Base Fare</span><span>₹{booking.fare.base}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Reservation Charge</span><span>₹{booking.fare.res}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Superfast Charge</span><span>₹{booking.fare.sf}</span></div>
                  <div className="flex justify-between"><span className="text-muted">GST</span><span>₹{booking.fare.gst}</span></div>
                  <div className="pt-2 mt-2 border-t border-border flex justify-between font-bold text-lg text-primary">
                    <span>Total Amount</span><span>₹{booking.fare.total}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">Payment Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted text-xs">Payment Method</div>
                    <div className="font-medium">{booking.payment.method}</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs">Transaction ID</div>
                    <div className="font-medium font-mono">{booking.payment.id}</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs">Transaction Date</div>
                    <div className="font-medium">{booking.payment.date}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
