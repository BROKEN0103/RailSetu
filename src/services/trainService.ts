import { Train, SearchParams } from '@/types';
import { trains } from '@/data/trains';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const trainService = {
  searchTrains: async (params: SearchParams): Promise<Train[]> => {
    if (USE_MOCK) {
      await delay(500);
      return trains.filter(t => 
        t.source.code === params.from && 
        t.destination.code === params.to
      );
    }
    throw new Error('API not implemented');
  },

  getAllTrains: async (): Promise<Train[]> => {
    if (USE_MOCK) {
      await delay(400);
      return trains;
    }
    throw new Error('API not implemented');
  },

  getTrainById: async (id: string): Promise<Train | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return trains.find(t => t.id === id);
    }
    throw new Error('API not implemented');
  }
};
