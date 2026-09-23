import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Clock, MapPin, Users, Ticket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

const TrainDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock Train Data
  const train = {
    number: '12951',
    name: 'Rajdhani Express',
    type: 'Rajdhani',
    status: 'ACTIVE',
    source: 'New Delhi (NDLS)',
    destination: 'Mumbai Central (MMCT)',
    departure: '16:30',
    arrival: '08:35',
    distance: 1384,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { code: '1A', name: 'First AC', coaches: 2, totalSeats: 48 },
      { code: '2A', name: 'Second AC', coaches: 5, totalSeats: 260 },
      { code: '3A', name: 'Third AC', coaches: 11, totalSeats: 792 },
    ],
    amenities: ['WiFi', 'Pantry', 'Charging Points', 'Blankets', 'Reading Light', 'Bio-Toilet']
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/trains')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {train.number} - {train.name}
              <Badge variant={train.status === 'ACTIVE' ? 'success' : 'secondary'}>{train.status}</Badge>
            </h1>
            <p className="text-muted">{train.type} Express</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => navigate(`/admin/trains/${id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="error" className="bg-error/10 text-error hover:bg-error/20 border-none">
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Route Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Route & Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted">Source</p>
                <p className="font-semibold text-lg">{train.source}</p>
                <p className="text-xl font-bold text-primary">{train.departure}</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-4 my-4 sm:my-0">
                <p className="text-xs text-muted mb-1">{train.distance} km</p>
                <div className="w-full h-[2px] bg-border relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-xs text-muted mt-1">16h 05m</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted">Destination</p>
                <p className="font-semibold text-lg">{train.destination}</p>
                <p className="text-xl font-bold text-primary">{train.arrival}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Running Days</h4>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <Badge 
                    key={day} 
                    variant={train.days.includes(day) ? 'default' : 'secondary'}
                    className={train.days.includes(day) ? 'bg-primary' : 'bg-gray-100 text-gray-400'}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Total Capacity</p>
                <p className="font-bold">1,100 Seats</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-full">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Avg. Occupancy</p>
                <p className="font-bold">92%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted">Punctuality</p>
                <p className="font-bold">85% On Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Composition */}
      <Card>
        <CardHeader>
          <CardTitle>Coach Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Class Name</TableHead>
                <TableHead>Coaches</TableHead>
                <TableHead className="text-right">Total Seats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {train.classes.map(cls => (
                <TableRow key={cls.code}>
                  <TableCell className="font-bold">{cls.code}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.coaches}</TableCell>
                  <TableCell className="text-right">{cls.totalSeats}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainDetail;
