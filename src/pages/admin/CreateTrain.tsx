import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const CreateTrain: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    navigate('/admin/trains');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {isEdit ? 'Edit Train' : 'Add New Train'}
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Train Number</label>
              <Input placeholder="e.g., 12951" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Train Name</label>
              <Input placeholder="e.g., Rajdhani Express" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Train Type</label>
              <Select required>
                <option value="">Select Type</option>
                <option value="Rajdhani">Rajdhani</option>
                <option value="Shatabdi">Shatabdi</option>
                <option value="Superfast">Superfast</option>
                <option value="Express">Express</option>
                <option value="Passenger">Passenger</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source Station</label>
              <Select required>
                <option value="">Select Station</option>
                <option value="NDLS">New Delhi (NDLS)</option>
                <option value="MMCT">Mumbai Central (MMCT)</option>
                <option value="HWH">Howrah (HWH)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination Station</label>
              <Select required>
                <option value="">Select Station</option>
                <option value="NDLS">New Delhi (NDLS)</option>
                <option value="MMCT">Mumbai Central (MMCT)</option>
                <option value="HWH">Howrah (HWH)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure Time</label>
              <Input type="time" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Arrival Time</label>
              <Input type="time" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance (km)</label>
              <Input type="number" placeholder="e.g., 1384" required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Running Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <label key={day} className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="rounded text-primary" defaultChecked />
                  <span className="text-sm font-medium">{day}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Classes & Coaches</CardTitle>
            <Button type="button" variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Class
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Example of a class entry */}
            <div className="flex flex-wrap items-end gap-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-2 flex-1 min-w-[120px]">
                <label className="text-xs font-medium">Class Type</label>
                <Select>
                  <option value="1A">First AC (1A)</option>
                  <option value="2A">Second AC (2A)</option>
                  <option value="3A">Third AC (3A)</option>
                  <option value="SL">Sleeper (SL)</option>
                </Select>
              </div>
              <div className="space-y-2 flex-1 min-w-[100px]">
                <label className="text-xs font-medium">Coaches</label>
                <Input type="number" defaultValue={2} />
              </div>
              <div className="space-y-2 flex-1 min-w-[100px]">
                <label className="text-xs font-medium">Seats/Coach</label>
                <Input type="number" defaultValue={24} />
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-error">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pb-10">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/trains')}>Cancel</Button>
          <Button type="submit">Save Train</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrain;
