import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';

const TrainManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [trainToDelete, setTrainToDelete] = useState<string | null>(null);

  // Mock data
  const trains = [
    { id: '1', number: '12951', name: 'Rajdhani Express', type: 'Rajdhani', source: 'NDLS', destination: 'MMCT', dep: '16:30', arr: '08:35', status: 'ACTIVE' },
    { id: '2', number: '12009', name: 'Shatabdi Express', type: 'Shatabdi', source: 'BCT', destination: 'ADI', dep: '06:20', arr: '12:55', status: 'ACTIVE' },
    { id: '3', number: '12229', name: 'Lucknow Mail', type: 'Superfast', source: 'LJN', destination: 'NDLS', dep: '22:00', arr: '06:55', status: 'INACTIVE' },
    { id: '4', number: '12627', name: 'Karnataka Express', type: 'Superfast', source: 'SBC', destination: 'NDLS', dep: '19:20', arr: '09:00', status: 'ACTIVE' },
    { id: '5', number: '12925', name: 'Paschim Express', type: 'Superfast', source: 'BDTS', destination: 'ASR', dep: '12:00', arr: '19:20', status: 'ACTIVE' },
  ];

  const handleDeleteClick = (id: string) => {
    setTrainToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // API call to delete
    console.log('Deleting train', trainToDelete);
    setDeleteModalOpen(false);
    setTrainToDelete(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Train Management</h1>
        <Button onClick={() => navigate('/admin/trains/create')} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Train
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <Input 
                placeholder="Search by Train Number or Name..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select className="w-[150px]">
                <option value="">All Types</option>
                <option value="rajdhani">Rajdhani</option>
                <option value="shatabdi">Shatabdi</option>
                <option value="superfast">Superfast</option>
              </Select>
              <Select className="w-[150px]">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Train Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Timings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trains.map((train) => (
                  <TableRow key={train.id}>
                    <TableCell className="font-semibold">{train.number}</TableCell>
                    <TableCell>{train.name}</TableCell>
                    <TableCell>{train.type}</TableCell>
                    <TableCell>
                      {train.source} &rarr; {train.destination}
                    </TableCell>
                    <TableCell>
                      {train.dep} - {train.arr}
                    </TableCell>
                    <TableCell>
                      <Badge variant={train.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {train.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/trains/${train.id}`)}>
                          <Eye className="h-4 w-4 text-muted hover:text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/trains/${train.id}/edit`)}>
                          <Edit className="h-4 w-4 text-muted hover:text-secondary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(train.number)}>
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
            <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Train">
        <div className="space-y-4">
          <p>Are you sure you want to delete train <strong>{trainToDelete}</strong>? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="error" onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrainManagement;
