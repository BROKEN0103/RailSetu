import React, { useState } from 'react';
import { Plus, Calculator, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';

const FareManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [calcTrain, setCalcTrain] = useState('');
  const [calcClass, setCalcClass] = useState('');
  const [calcDistance, setCalcDistance] = useState('');
  const [calcResult, setCalcResult] = useState<any>(null);

  const fareRules = [
    { id: '1', trainType: 'Rajdhani', class: '1A', baseFare: 1500, distRate: 2.5, resCharge: 60, superfast: 75, gst: 5, effectiveFrom: '2025-01-01', status: 'ACTIVE' },
    { id: '2', trainType: 'Rajdhani', class: '2A', baseFare: 1000, distRate: 1.8, resCharge: 50, superfast: 45, gst: 5, effectiveFrom: '2025-01-01', status: 'ACTIVE' },
    { id: '3', trainType: 'Rajdhani', class: '3A', baseFare: 800, distRate: 1.2, resCharge: 40, superfast: 45, gst: 5, effectiveFrom: '2025-01-01', status: 'ACTIVE' },
    { id: '4', trainType: 'Superfast', class: 'SL', baseFare: 200, distRate: 0.6, resCharge: 20, superfast: 30, gst: 0, effectiveFrom: '2024-06-01', status: 'ACTIVE' },
  ];

  const handleCalculate = () => {
    if(!calcDistance) return;
    const dist = parseInt(calcDistance);
    const base = 800 + (dist * 1.2);
    const res = 40;
    const sf = 45;
    const totalWithoutGst = base + res + sf;
    const gst = totalWithoutGst * 0.05;
    setCalcResult({ base, res, sf, gst, total: totalWithoutGst + gst });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Fare Management</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Fare Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fare Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Train Type</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Base(₹)</TableHead>
                      <TableHead>Rate(₹/km)</TableHead>
                      <TableHead>Charges</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fareRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-semibold">{rule.trainType}</TableCell>
                        <TableCell>{rule.class}</TableCell>
                        <TableCell>₹{rule.baseFare}</TableCell>
                        <TableCell>₹{rule.distRate}</TableCell>
                        <TableCell className="text-xs text-muted">
                          Res: ₹{rule.resCharge}<br/>
                          SF: ₹{rule.superfast}<br/>
                          GST: {rule.gst}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={rule.status === 'ACTIVE' ? 'success' : 'secondary'}>
                            {rule.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4 text-muted hover:text-secondary" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-muted hover:text-error" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                <Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Fare Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Train Type</label>
                <Select value={calcTrain} onChange={(e) => setCalcTrain(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="rajdhani">Rajdhani</option>
                  <option value="superfast">Superfast</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class</label>
                <Select value={calcClass} onChange={(e) => setCalcClass(e.target.value)}>
                  <option value="">Select Class</option>
                  <option value="1A">1A</option>
                  <option value="2A">2A</option>
                  <option value="3A">3A</option>
                  <option value="SL">SL</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Distance (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g. 500" 
                  value={calcDistance} 
                  onChange={(e) => setCalcDistance(e.target.value)} 
                />
              </div>
              <Button className="w-full" onClick={handleCalculate}>Calculate</Button>

              {calcResult && (
                <div className="mt-6 pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Distance Fare:</span>
                    <span>₹{calcResult.base.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Reservation Charge:</span>
                    <span>₹{calcResult.res.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Superfast Charge:</span>
                    <span>₹{calcResult.sf.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">GST (5%):</span>
                    <span>₹{calcResult.gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total Fare:</span>
                    <span className="text-primary">₹{calcResult.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Fare Rule" className="max-w-2xl">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Train Type</label>
              <Select required>
                <option value="Rajdhani">Rajdhani</option>
                <option value="Shatabdi">Shatabdi</option>
                <option value="Superfast">Superfast</option>
                <option value="Express">Express</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select required>
                <option value="1A">1A</option>
                <option value="2A">2A</option>
                <option value="3A">3A</option>
                <option value="SL">SL</option>
                <option value="CC">CC</option>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Fare (₹)</label>
              <Input type="number" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance Rate (₹/km)</label>
              <Input type="number" step="0.1" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reservation Charge</label>
              <Input type="number" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Superfast Charge</label>
              <Input type="number" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GST %</label>
              <Input type="number" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Effective From</label>
              <Input type="date" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Fare Rule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FareManagement;
