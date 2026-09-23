import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';

const StationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Mock data
  const stations = [
    { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi', status: 'ACTIVE' },
    { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra', status: 'ACTIVE' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', status: 'ACTIVE' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu', status: 'ACTIVE' },
    { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru', state: 'Karnataka', status: 'ACTIVE' },
  ];

  const handleOpenModal = (edit = false) => {
    setIsEdit(edit);
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Station Management</h1>
        <Button onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Station
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <Input 
                placeholder="Search by Code, Name or City..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select className="w-[150px]">
                <option value="">All States</option>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
              </Select>
              <Select className="w-[150px]">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Station Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stations.map((st) => (
                  <TableRow key={st.code}>
                    <TableCell className="font-semibold">{st.code}</TableCell>
                    <TableCell>{st.name}</TableCell>
                    <TableCell>{st.city}</TableCell>
                    <TableCell>{st.state}</TableCell>
                    <TableCell>
                      <Badge variant={st.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {st.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenModal(true)}>
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
            <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? 'Edit Station' : 'Add Station'}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Station Code</label>
              <Input placeholder="e.g. NDLS" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Station Name</label>
            <Input placeholder="e.g. New Delhi" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input placeholder="e.g. New Delhi" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input placeholder="e.g. Delhi" required />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Station</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StationManagement;
