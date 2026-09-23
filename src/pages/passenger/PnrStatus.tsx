import React, { useState } from 'react';
import { Search, Train, ArrowRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export function PnrStatus() {
  const [pnr, setPnr] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnr.length !== 10) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl space-y-8">
        
        {/* Search Section */}
        <Card className="p-8 shadow-md border-border text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Check PNR Status</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">Enter your 10-digit PNR number to check current reservation status, coach, and berth details.</p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
            <Input 
              placeholder="Enter 10-digit PNR" 
              value={pnr}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="text-lg text-center tracking-widest font-mono font-bold"
              maxLength={10}
            />
            <Button type="submit" disabled={pnr.length !== 10 || status === 'loading'} className="px-8 bg-accent hover:bg-accent-light text-foreground font-bold">
              {status === 'loading' ? 'Checking...' : 'Check'}
            </Button>
          </form>
        </Card>

        {/* Results Section */}
        {status === 'success' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-0 overflow-hidden shadow-lg border-border">
              <div className="bg-primary p-4 text-surface flex justify-between items-center">
                <div className="font-mono text-xl font-bold tracking-widest">PNR: {pnr}</div>
                <div className="text-xs opacity-80">Last updated: Just now</div>
              </div>
              
              <div className="p-6 bg-white space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border">
                  <div>
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <Train className="w-5 h-5" /> 12127 Intercity Express
                    </h3>
                    <div className="text-sm text-muted mt-1">15 Oct 2026 • AC 3 Tier (3A) • General Quota</div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg border border-border">
                    <div className="text-center">
                      <div className="font-bold text-lg">MMCT</div>
                      <div className="text-xs text-muted">06:40</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted" />
                    <div className="text-center">
                      <div className="font-bold text-lg">PUNE</div>
                      <div className="text-xs text-muted">10:15</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted mb-4">Passenger Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-border text-xs text-muted">
                          <th className="p-3 font-semibold rounded-tl-lg">S.No</th>
                          <th className="p-3 font-semibold">Booking Status</th>
                          <th className="p-3 font-semibold">Current Status</th>
                          <th className="p-3 font-semibold rounded-tr-lg text-right">Coach/Seat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="p-3">1</td>
                          <td className="p-3">
                            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">CNF / B1 / 24</span>
                          </td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800 border-green-200 font-bold">CNF</Badge>
                          </td>
                          <td className="p-3 text-right font-bold text-primary">B1 / 24 (L)</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3">2</td>
                          <td className="p-3">
                            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">RAC / 12</span>
                          </td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800 border-green-200 font-bold">CNF</Badge>
                          </td>
                          <td className="p-3 text-right font-bold text-primary">B1 / 25 (M)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">Chart Prepared</Badge>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
