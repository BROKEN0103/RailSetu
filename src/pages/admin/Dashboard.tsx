import React, { useState } from 'react';
import { 
  Train, CheckCircle, Ticket, IndianRupee, Users, XCircle, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Eye 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
// import { dashboardData } from '@/data/dashboard'; // Assuming this exists, otherwise we'll mock it here

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const revenueData = [
    { name: 'Jan', value: 4000000 },
    { name: 'Feb', value: 3000000 },
    { name: 'Mar', value: 2000000 },
    { name: 'Apr', value: 2780000 },
    { name: 'May', value: 1890000 },
    { name: 'Jun', value: 2390000 },
    { name: 'Jul', value: 3490000 },
    { name: 'Aug', value: 4000000 },
    { name: 'Sep', value: 3000000 },
    { name: 'Oct', value: 2000000 },
    { name: 'Nov', value: 2780000 },
    { name: 'Dec', value: 3890000 },
  ];

  const bookingData = [
    { name: 'Mon', bookings: 1200 },
    { name: 'Tue', bookings: 1300 },
    { name: 'Wed', bookings: 1100 },
    { name: 'Thu', bookings: 1400 },
    { name: 'Fri', bookings: 1800 },
    { name: 'Sat', bookings: 2100 },
    { name: 'Sun', bookings: 1900 },
  ];

  const occupancyData = [
    { name: '1A', value: 400 },
    { name: '2A', value: 300 },
    { name: '3A', value: 300 },
    { name: 'SL', value: 800 },
    { name: 'CC', value: 200 },
  ];

  const routeData = [
    { name: 'NDLS - MMCT', value: 85 },
    { name: 'HWH - CSMT', value: 78 },
    { name: 'SBC - MAS', value: 92 },
    { name: 'PNBE - NDLS', value: 88 },
    { name: 'ADI - BCT', value: 75 },
  ];

  const recentBookings = [
    { pnr: '2435678901', passenger: 'Rahul Sharma', train: '12951 - Rajdhani Exp', date: '2026-10-15', status: 'CONFIRMED' },
    { pnr: '2435678902', passenger: 'Priya Patel', train: '12009 - Shatabdi Exp', date: '2026-10-16', status: 'WAITLISTED' },
    { pnr: '2435678903', passenger: 'Amit Kumar', train: '12229 - Lucknow Mail', date: '2026-10-15', status: 'CONFIRMED' },
    { pnr: '2435678904', passenger: 'Sneha Gupta', train: '12627 - Karnataka Exp', date: '2026-10-17', status: 'CANCELLED' },
    { pnr: '2435678905', passenger: 'Vikram Singh', train: '12925 - Paschim Exp', date: '2026-10-18', status: 'RAC' },
  ];

  const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-80" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Admin</h1>
          <p className="text-muted">{currentDate}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Trains" value="156" icon={<Train />} color="text-secondary" trend="+2.5%" />
        <KpiCard title="Active Trains" value="142" icon={<CheckCircle />} color="text-success" trend="+1.2%" />
        <KpiCard title="Today's Bookings" value="1,247" icon={<Ticket />} color="text-warning" trend="+12.5%" />
        <KpiCard title="Today's Revenue" value="₹18,45,600" icon={<IndianRupee />} color="text-success" trend="+8.4%" />
        <KpiCard title="Active Users" value="45,832" icon={<Users />} color="text-secondary" trend="+5.1%" />
        <KpiCard title="Cancelled Tickets" value="89" icon={<XCircle />} color="text-error" trend="-2.4%" trendDown />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (12 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']} />
                <Line type="monotone" dataKey="value" stroke="#1e3a5f" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Train Occupancy by Class</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Routes (Occupancy %)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="value" fill="#d97706" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PNR</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Train</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.pnr}>
                    <TableCell className="font-medium">{booking.pnr}</TableCell>
                    <TableCell>{booking.passenger}</TableCell>
                    <TableCell>{booking.train}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        booking.status === 'CONFIRMED' ? 'success' :
                        booking.status === 'CANCELLED' ? 'error' :
                        booking.status === 'WAITLISTED' ? 'warning' : 'default'
                      }>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for KPI Cards
const KpiCard = ({ title, value, icon, color, trend, trendDown = false }: any) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-background ${color}`}>
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${trendDown ? 'text-error' : 'text-success'}`}>
          {trendDown ? <ArrowDownRight className="h-4 w-4 mr-1" /> : <ArrowUpRight className="h-4 w-4 mr-1" />}
          {trend}
        </span>
        <span className="text-muted ml-2">vs yesterday</span>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
