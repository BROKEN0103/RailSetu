import { FareRule } from '@/types';
import { fareRules } from '@/data/fares';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fareService = {
  getFareRules: async (): Promise<FareRule[]> => {
    if (USE_MOCK) {
      await delay(300);
      return fareRules;
    }
    throw new Error('API not implemented');
  }
};
