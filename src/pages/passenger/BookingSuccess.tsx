import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, FileText, PlusCircle, Search, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function BookingSuccess() {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);
  const pnr = "4827195631";

  const copyPnr = () => {
    navigator.clipboard.writeText(pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted">A confirmation has been sent to rahul.sharma@example.com and SMS to +91 ******3210</p>
        </div>

        <Card className="p-0 overflow-hidden shadow-lg border-border mb-8">
          <div className="bg-primary p-6 text-center text-surface relative">
            <div className="text-sm text-blue-200 mb-1 font-medium tracking-wide uppercase">PNR Number</div>
            <div className="text-4xl font-black tracking-widest flex items-center justify-center gap-3">
              {pnr}
              <button onClick={copyPnr} className="p-2 hover:bg-primary-dark rounded-full transition-colors group" title="Copy PNR">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-blue-200 group-hover:text-white" />}
              </button>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-6 bg-white">
            <div className="flex flex-wrap justify-between items-end border-b border-border pb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-primary">12127 Intercity Express</h3>
                <div className="text-sm text-muted">AC 3 Tier (3A) | General</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-muted mb-1">Status</div>
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">CONFIRMED</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-border">
              <div>
                <div className="text-xs text-muted mb-1">Date</div>
                <div className="font-semibold text-sm">15 Oct 2026</div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Departure</div>
                <div className="font-semibold text-sm">06:40 (MMCT)</div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Arrival</div>
                <div className="font-semibold text-sm">10:15 (PUNE)</div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Amount Paid</div>
                <div className="font-semibold text-sm">₹ 1,640</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Passenger Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-border">
                  <div>
                    <span className="font-semibold">Rahul Sharma</span> <span className="text-xs text-muted">(32, M)</span>
                  </div>
                  <div className="text-sm font-bold text-primary">Coach B1 | Seat 24 (L)</div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-border">
                  <div>
                    <span className="font-semibold">Priya Sharma</span> <span className="text-xs text-muted">(28, F)</span>
                  </div>
                  <div className="text-sm font-bold text-primary">Coach B1 | Seat 25 (M)</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button className="w-full py-6 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Ticket
          </Button>
          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-primary text-primary hover:bg-blue-50" onClick={() => navigate('/bookings')}>
            <FileText className="w-5 h-5" /> View My Bookings
          </Button>
          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2" onClick={() => navigate('/')}>
            <PlusCircle className="w-5 h-5" /> Book Another Ticket
          </Button>
          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2" onClick={() => navigate('/pnr-status')}>
            <Search className="w-5 h-5" /> Check PNR Status
          </Button>
        </div>
      </div>
    </div>
  );
}
