import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';

const ScheduleManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Mock data
  const schedules = [
    { id: '1', train: '12951', name: 'Rajdhani Exp', station: 'NDLS', arr: 'Source', dep: '16:30', day: 1, platform: '3', status: 'ACTIVE' },
    { id: '2', train: '12951', name: 'Rajdhani Exp', station: 'KOTA', arr: '21:30', dep: '21:40', day: 1, platform: '2', status: 'ACTIVE' },
    { id: '3', train: '12951', name: 'Rajdhani Exp', station: 'BRC', arr: '02:40', dep: '02:50', day: 2, platform: '1', status: 'ACTIVE' },
    { id: '4', train: '12951', name: 'Rajdhani Exp', station: 'ST', arr: '04:20', dep: '04:25', day: 2, platform: '2', status: 'ACTIVE' },
    { id: '5', train: '12951', name: 'Rajdhani Exp', station: 'MMCT', arr: '08:35', dep: 'Dest', day: 2, platform: '1', status: 'ACTIVE' },
  ];

  const handleOpenModal = (edit = false) => {
    setIsEdit(edit);
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Schedule Management</h1>
        <Button onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Schedule
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select className="flex-1">
              <option value="">Select Train</option>
              <option value="12951">12951 - Rajdhani Exp</option>
            </Select>
            <Select className="w-full sm:w-[150px]">
              <option value="">All Days</option>
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
            </Select>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Train</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>PF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((sch) => (
                  <TableRow key={sch.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{sch.train}</div>
                        <div className="text-xs text-muted">{sch.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{sch.station}</TableCell>
                    <TableCell>{sch.arr}</TableCell>
                    <TableCell>{sch.dep}</TableCell>
                    <TableCell>Day {sch.day}</TableCell>
                    <TableCell>{sch.platform}</TableCell>
                    <TableCell>
                      <Badge variant={sch.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {sch.status}
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
            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? 'Edit Schedule' : 'Add Schedule'}>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Train</label>
              <Select required>
                <option value="">Select Train</option>
                <option value="12951">12951</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Station</label>
              <Select required>
                <option value="">Select Station</option>
                <option value="NDLS">NDLS</option>
                <option value="KOTA">KOTA</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arrival Time</label>
              <Input placeholder="e.g. 21:30 or Source" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure Time</label>
              <Input placeholder="e.g. 21:40 or Dest" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Day</label>
              <Input type="number" min="1" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Input />
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
            <Button type="submit">Save Schedule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ScheduleManagement;
