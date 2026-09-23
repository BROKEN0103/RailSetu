import { DashboardStats, RevenueData, ChartData } from '@/types';

export const dashboardStats: DashboardStats = {
  totalTrains: 1250,
  activeTrains: 1180,
  todayBookings: 45230,
  todayRevenue: 28500000,
  activeUsers: 85400,
  cancelledTickets: 1240,
};

export const revenueData: RevenueData[] = [
  { date: '2025-11', revenue: 650000000, bookings: 1200000 },
  { date: '2025-12', revenue: 780000000, bookings: 1450000 },
  { date: '2026-01', revenue: 720000000, bookings: 1300000 },
  { date: '2026-02', revenue: 680000000, bookings: 1250000 },
  { date: '2026-03', revenue: 750000000, bookings: 1350000 },
  { date: '2026-04', revenue: 820000000, bookings: 1500000 },
  { date: '2026-05', revenue: 950000000, bookings: 1750000 },
  { date: '2026-06', revenue: 890000000, bookings: 1600000 },
  { date: '2026-07', revenue: 740000000, bookings: 1320000 },
  { date: '2026-08', revenue: 760000000, bookings: 1380000 },
  { date: '2026-09', revenue: 810000000, bookings: 1420000 },
  { date: '2026-10', revenue: 850000000, bookings: 1480000 },
];

export const occupancyData: ChartData[] = [
  { label: '1A', value: 85 },
  { label: '2A', value: 92 },
  { label: '3A', value: 98 },
  { label: 'SL', value: 100 },
  { label: 'CC', value: 88 },
  { label: 'GN', value: 100 },
];

export const popularRoutes: ChartData[] = [
  { label: 'Mumbai - Delhi', value: 25000 },
  { label: 'Delhi - Kolkata', value: 22000 },
  { label: 'Bengaluru - Chennai', value: 18000 },
  { label: 'Mumbai - Ahmedabad', value: 15000 },
  { label: 'Delhi - Chandigarh', value: 12000 },
];
