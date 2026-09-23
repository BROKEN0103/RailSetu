import { User } from '@/types';
import { users } from '@/data/users';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, password: string):Promise<{user: User; token: string}> => {
    if (USE_MOCK) {
      await delay(500);
      const user = users.find(u => u.email === email) || users[0];
      return { user, token: 'mock-jwt-token' };
    }
    // API logic would go here
    throw new Error('API not implemented');
  },
  
  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK) {
      await delay(300);
      return users[0];
    }
    throw new Error('API not implemented');
  },
  
  logout: async () => {
    if (USE_MOCK) {
      await delay(300);
      return true;
    }
  }
};
