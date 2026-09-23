import { User } from '@/types';
import { users } from '@/data/users';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    if (USE_MOCK) {
      await delay(400);
      return users;
    }
    throw new Error('API not implemented');
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return users.find(u => u.id === id);
    }
    throw new Error('API not implemented');
  }
};
