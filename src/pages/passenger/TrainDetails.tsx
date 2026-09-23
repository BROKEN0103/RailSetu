import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Coffee, Wifi, Plug, ShieldCheck, Calendar, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { trains } from '@/data/trains';

export function TrainDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock train data
  const train = trains?.find(t => t.id === id) || {
    id: '1', number: '12127', name: 'Intercity Express', type: 'Superfast'
  };

  const stops = [
    { name: 'Mumbai Central', code: 'MMCT', arr: 'Source', dep: '06:40', day: 1, platform: '1', dist: 0 },
    { name: 'Dadar', code: 'DDR', arr: '06:50', dep: '06:52', day: 1, platform: '3', dist: 6 },
    { name: 'Thane', code: 'TNA', arr: '07:15', dep: '07:17', day: 1, platform: '5', dist: 33 },
    { name: 'Kalyan Junction', code: 'KYN', arr: '07:42', dep: '07:45', day: 1, platform: '4', dist: 53 },
    { name: 'Karjat', code: 'KJT', arr: '08:25', dep: '08:28', day: 1, platform: '1', dist: 99 },
    { name: 'Lonavala', code: 'LNL', arr: '09:13', dep: '09:15', day: 1, platform: '1', dist: 127 },
    { name: 'Pune Junction', code: 'PUNE', arr: '10:15', dep: 'Destination', day: 1, platform: '2', dist: 191 },
  ];

  const classes = [
    { type: '1A', name: 'First AC', fare: 1450, status: 'AVAILABLE', seats: 12 },
    { type: '2A', name: 'Second AC', fare: 1050, status: 'RAC', seats: 4 },
    { type: '3A', name: 'Third AC', fare: 820, status: 'AVAILABLE', seats: 42 },
    { type: 'SL', name: 'Sleeper', fare: 340, status: 'WAITING', seats: 15 },
    { type: 'CC', name: 'AC Chair Car', fare: 650, status: 'AVAILABLE', seats: 28 }
  ];

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDays = [0, 1, 2, 3, 4, 5, 6]; // Daily

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent text-muted">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
      </Button>

      {/* Header */}
      <Card className="p-6 mb-6 bg-primary text-surface shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{train.number} {train.name}</h1>
              <Badge className="bg-secondary text-white border-transparent">{train.type}</Badge>
            </div>
            <div className="text-sm opacity-90 flex items-center gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Mumbai Central to Pune Junction</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 03h 35m</span>
            </div>
          </div>
          <div className="bg-primary-dark p-3 rounded-lg text-center min-w-[120px]">
            <div className="text-xs text-muted mb-1 uppercase tracking-wider">Status</div>
            <div className="text-green-400 font-bold">On Time</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Availability Table */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-primary border-b border-border pb-2">Classes & Availability</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-border text-muted text-sm">
                    <th className="p-3 font-semibold">Class</th>
                    <th className="p-3 font-semibold">Fare</th>
                    <th className="p-3 font-semibold">Availability</th>
                    <th className="p-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-gray-50/50">
                      <td className="p-3">
                        <div className="font-bold">{cls.type}</div>
                        <div className="text-xs text-muted">{cls.name}</div>
                      </td>
                      <td className="p-3 font-medium flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" /> {cls.fare}
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={cn(
                          "px-2 py-1 text-xs font-bold",
                          cls.status === 'AVAILABLE' ? "border-green-200 bg-green-50 text-green-700" :
                          cls.status === 'RAC' ? "border-amber-200 bg-amber-50 text-amber-700" :
                          "border-red-200 bg-red-50 text-red-700"
                        )}>
                          {cls.status} {cls.seats > 0 ? cls.seats : ''}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button size="sm" onClick={() => navigate('/passenger-details')} className="bg-accent hover:bg-accent-light text-foreground">
                          Book
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Route Timeline */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 text-primary border-b border-border pb-2">Route Information</h2>
            <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {stops.map((stop, idx) => {
                const isOrigin = idx === 0;
                const isDest = idx === stops.length - 1;
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className={cn(
                      "absolute left-[-29px] w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center bg-white shadow-sm mt-1.5",
                      isOrigin ? "border-green-500 bg-green-500" : 
                      isDest ? "border-red-500 bg-red-500" : "border-primary"
                    )}>
                      {!isOrigin && !isDest && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="sm:col-span-2">
                        <div className="font-bold text-foreground">{stop.name} ({stop.code})</div>
                        <div className="text-xs text-muted">Platform {stop.platform} • {stop.dist} km</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted text-xs">Arrival</div>
                        <div className={cn("font-medium", isOrigin && "text-muted italic")}>{stop.arr}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted text-xs">Departure</div>
                        <div className={cn("font-medium", isDest && "text-muted italic")}>{stop.dep}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar - Right 1 col */}
        <div className="space-y-6">
          <Card className="p-5 bg-blue-50/50 border-blue-100">
            <h3 className="font-semibold text-primary mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" /> Running Days</h3>
            <div className="flex gap-1 justify-between">
              {days.map((day, idx) => (
                <div key={idx} className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                  activeDays.includes(idx) ? "bg-primary text-surface" : "bg-gray-200 text-gray-400"
                )}>
                  {day}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-primary mb-4">Amenities</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm"><Coffee className="w-4 h-4 text-muted" /> Pantry Car Available</div>
              <div className="flex items-center gap-3 text-sm"><Wifi className="w-4 h-4 text-muted" /> Free WiFi in AC classes</div>
              <div className="flex items-center gap-3 text-sm"><Plug className="w-4 h-4 text-muted" /> Charging ports at all seats</div>
              <div className="flex items-center gap-3 text-sm"><ShieldCheck className="w-4 h-4 text-muted" /> E-Catering allowed</div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-primary mb-4">Journey Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted mb-1">Total Distance</div>
                <div className="font-bold text-lg">191 km</div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Avg Speed</div>
                <div className="font-bold text-lg">54 km/h</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
