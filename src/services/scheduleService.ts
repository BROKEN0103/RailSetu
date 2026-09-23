import { Schedule } from '@/types';
import { schedules } from '@/data/schedules';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const scheduleService = {
  getSchedules: async (trainId: string): Promise<Schedule[]> => {
    if (USE_MOCK) {
      await delay(400);
      return schedules.filter(s => s.trainId === trainId);
    }
    throw new Error('API not implemented');
  }
};
