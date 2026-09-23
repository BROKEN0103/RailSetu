import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, ShieldCheck, CreditCard, Smartphone, Building, IndianRupee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export function Payment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/booking-success');
    }, 2500);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Safe & Secure Header */}
      <div className="bg-primary-dark text-white py-3 px-4">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-sm">100% Secure Payment</span>
          </div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="text-gray-400">Complete payment in</span>
            <span className={cn("px-2 py-1 bg-white/10 rounded font-mono", timeLeft < 120 ? "text-red-400" : "text-white")}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Payment Methods */}
          <div className="flex-1">
            <Card className="overflow-hidden border-border shadow-md">
              <div className="flex flex-col sm:flex-row border-b border-border">
                <button
                  onClick={() => setActiveTab('upi')}
                  className={cn(
                    "flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors",
                    activeTab === 'upi' ? "bg-white text-primary border-b-2 border-primary" : "bg-gray-50 text-muted hover:bg-gray-100"
                  )}
                >
                  <Smartphone className="w-5 h-5" /> UPI
                </button>
                <button
                  onClick={() => setActiveTab('card')}
                  className={cn(
                    "flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors",
                    activeTab === 'card' ? "bg-white text-primary border-b-2 border-primary" : "bg-gray-50 text-muted hover:bg-gray-100"
                  )}
                >
                  <CreditCard className="w-5 h-5" /> Card
                </button>
                <button
                  onClick={() => setActiveTab('netbanking')}
                  className={cn(
                    "flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors",
                    activeTab === 'netbanking' ? "bg-white text-primary border-b-2 border-primary" : "bg-gray-50 text-muted hover:bg-gray-100"
                  )}
                >
                  <Building className="w-5 h-5" /> Net Banking
                </button>
              </div>

              <div className="p-6 bg-white min-h-[350px]">
                {activeTab === 'upi' && (
                  <form onSubmit={handlePayment} className="space-y-6 max-w-sm mx-auto pt-4">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-gray-100 mx-auto mb-4 border border-border p-2 rounded">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full h-full opacity-50" />
                      </div>
                      <p className="text-sm text-muted">Scan QR Code using any UPI app</p>
                      <div className="my-4 flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        <span className="text-muted text-xs font-medium uppercase">OR</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter UPI ID</label>
                      <Input placeholder="username@upi" required disabled={isProcessing} />
                    </div>
                    <Button type="submit" disabled={isProcessing} className="w-full bg-success hover:bg-green-700 text-white py-6 text-lg font-bold shadow-lg">
                      {isProcessing ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                      ) : (
                        `Pay ₹1,640`
                      )}
                    </Button>
                  </form>
                )}

                {activeTab === 'card' && (
                  <form onSubmit={handlePayment} className="space-y-5 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <div className="relative">
                        <Input placeholder="0000 0000 0000 0000" maxLength={19} required disabled={isProcessing} className="pl-10" />
                        <CreditCard className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input placeholder="MM/YY" maxLength={5} required disabled={isProcessing} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input type="password" placeholder="***" maxLength={3} required disabled={isProcessing} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name on Card</label>
                      <Input placeholder="Enter name" required disabled={isProcessing} />
                    </div>
                    <Button type="submit" disabled={isProcessing} className="w-full bg-success hover:bg-green-700 text-white py-6 text-lg font-bold mt-4 shadow-lg">
                      {isProcessing ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                      ) : (
                        `Pay ₹1,640`
                      )}
                    </Button>
                  </form>
                )}

                {activeTab === 'netbanking' && (
                  <form onSubmit={handlePayment} className="space-y-6 pt-2">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Popular Banks</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak', 'PNB'].map(bank => (
                          <div key={bank} className="border border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-colors">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                            <div className="text-xs font-medium">{bank}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Other Banks</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option>Select your bank</option>
                        <option>Bank of Baroda</option>
                        <option>Canara Bank</option>
                        <option>Union Bank</option>
                      </select>
                    </div>
                    <Button type="button" onClick={handlePayment} disabled={isProcessing} className="w-full bg-success hover:bg-green-700 text-white py-6 text-lg font-bold shadow-lg">
                      {isProcessing ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirecting to Bank...</>
                      ) : (
                        `Pay ₹1,640`
                      )}
                    </Button>
                  </form>
                )}
              </div>
              <div className="bg-gray-50 p-4 border-t border-border flex justify-center items-center gap-6 text-xs text-muted">
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> 256-bit Encryption</div>
                <div>PCI DSS Compliant</div>
              </div>
            </Card>
          </div>

          {/* Amount Sidebar */}
          <div className="md:w-72 shrink-0">
            <Card className="p-6 sticky top-8 bg-primary text-surface shadow-lg border-primary-dark">
              <div className="text-sm text-blue-200 mb-1">Amount to Pay</div>
              <div className="text-4xl font-bold mb-6 flex items-center">
                <IndianRupee className="w-8 h-8 mr-1" /> 1,640
              </div>
              
              <div className="space-y-4 border-t border-primary-dark pt-4">
                <div>
                  <div className="text-sm font-semibold mb-1">12127 Intercity Exp</div>
                  <div className="text-xs text-blue-200">15 Oct 2026 • 2 Passengers</div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Class</div>
                  <div className="text-xs text-blue-200">AC 3 Tier (3A)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
