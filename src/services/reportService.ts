import { DashboardStats, RevenueData, ChartData } from '@/types';
import { dashboardStats, revenueData, occupancyData, popularRoutes } from '@/data/dashboard';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const reportService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (USE_MOCK) {
      await delay(400);
      return dashboardStats;
    }
    throw new Error('API not implemented');
  },
  
  getRevenueReport: async (): Promise<RevenueData[]> => {
    if (USE_MOCK) {
      await delay(400);
      return revenueData;
    }
    throw new Error('API not implemented');
  },

  getOccupancyReport: async (): Promise<ChartData[]> => {
    if (USE_MOCK) {
      await delay(300);
      return occupancyData;
    }
    throw new Error('API not implemented');
  },

  getPopularRoutes: async (): Promise<ChartData[]> => {
    if (USE_MOCK) {
      await delay(300);
      return popularRoutes;
    }
    throw new Error('API not implemented');
  }
};
