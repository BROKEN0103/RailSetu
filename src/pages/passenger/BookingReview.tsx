import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldAlert, FileText, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

export function BookingReview() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pb-12">
      {/* Progress Bar */}
      <div className="bg-surface border-b border-border py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center text-muted">
              <Check className="w-5 h-5 text-success mr-2" />
              <span className="hidden sm:inline">Passenger Info</span>
            </div>
            <div className="h-px bg-success flex-1 mx-4"></div>
            <div className="flex items-center text-muted">
              <Check className="w-5 h-5 text-success mr-2" />
              <span className="hidden sm:inline">Seat Selection</span>
            </div>
            <div className="h-px bg-success flex-1 mx-4"></div>
            <div className="flex items-center text-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">3</div>
              <span className="hidden sm:inline">Review</span>
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted">
              <div className="w-8 h-8 rounded-full border border-muted flex items-center justify-center mr-2">4</div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold text-primary mb-6">Review Your Booking</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            {/* Journey Details */}
            <Card className="p-0 overflow-hidden shadow-sm">
              <div className="bg-primary text-surface p-4 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    12127 Intercity Express
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-white font-normal">Superfast</span>
                  </h2>
                  <p className="text-sm opacity-90">AC 3 Tier (3A) | General Quota</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left flex-1">
                    <div className="text-2xl font-bold text-primary">06:40</div>
                    <div className="font-semibold mt-1">Mumbai Central (MMCT)</div>
                    <div className="text-sm text-muted">Thu, 15 Oct 2026</div>
                  </div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-xs text-muted font-medium bg-gray-100 px-3 py-1 rounded-full mb-2">03h 35m</span>
                    <div className="w-full flex items-center">
                      <div className="h-px bg-border flex-1"></div>
                      <ArrowRight className="w-5 h-5 text-muted mx-2" />
                      <div className="h-px bg-border flex-1"></div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-right flex-1">
                    <div className="text-2xl font-bold text-primary">10:15</div>
                    <div className="font-semibold mt-1">Pune Junction (PUNE)</div>
                    <div className="text-sm text-muted">Thu, 15 Oct 2026</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Passenger Details */}
            <Card className="p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">Passenger Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-border text-muted text-sm">
                      <th className="p-3 font-semibold">Name</th>
                      <th className="p-3 font-semibold">Age/Gender</th>
                      <th className="p-3 font-semibold">Coach</th>
                      <th className="p-3 font-semibold">Seat/Berth</th>
                      <th className="p-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Rahul Sharma</td>
                      <td className="p-3">32 / Male</td>
                      <td className="p-3 font-semibold text-primary">B1</td>
                      <td className="p-3">24 / Lower</td>
                      <td className="p-3 text-right">
                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">AVAILABLE</span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Priya Sharma</td>
                      <td className="p-3">28 / Female</td>
                      <td className="p-3 font-semibold text-primary">B1</td>
                      <td className="p-3">25 / Middle</td>
                      <td className="p-3 text-right">
                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">AVAILABLE</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-muted">
                <strong>Contact:</strong> rahul.sharma@example.com | +91 9876543210
              </div>
            </Card>

            <Alert className="bg-orange-50 border-orange-200 text-orange-800">
              <ShieldAlert className="w-5 h-5 text-orange-500 mr-2" />
              <div className="text-sm">
                <strong>Important:</strong> Please ensure all names match exactly with government ID proofs. You must carry the original ID proof during the journey.
              </div>
            </Alert>
          </div>

          {/* Fare Summary Sidebar */}
          <div className="lg:w-80 shrink-0">
            <Card className="p-6 sticky top-24 shadow-md border-border">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Fare Breakdown
              </h3>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted">Base Fare (2x)</span>
                  <span className="font-medium"><IndianRupee className="w-3 h-3 inline" /> 1,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Reservation Charge</span>
                  <span className="font-medium"><IndianRupee className="w-3 h-3 inline" /> 80</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Superfast Charge</span>
                  <span className="font-medium"><IndianRupee className="w-3 h-3 inline" /> 60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">GST (5%)</span>
                  <span className="font-medium"><IndianRupee className="w-3 h-3 inline" /> 100</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Concession</span>
                  <span>-<IndianRupee className="w-3 h-3 inline" /> 0</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border border-dashed">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-primary">Total Amount</span>
                  <span className="font-bold text-2xl text-primary flex items-center">
                    <IndianRupee className="w-5 h-5" /> 1,640
                  </span>
                </div>
                <div className="text-right text-xs text-muted mt-1">Inclusive of all taxes</div>
              </div>
              
              <Button 
                onClick={() => navigate('/payment')}
                className="w-full mt-6 bg-accent hover:bg-accent-light text-foreground text-lg py-6 font-bold shadow-lg"
              >
                Proceed to Payment
              </Button>
              
              <div className="mt-4 text-center">
                <Button variant="ghost" onClick={() => navigate(-1)} className="text-sm">
                  Cancel & Go Back
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
