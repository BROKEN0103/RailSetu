import { Payment } from '@/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentService = {
  processPayment: async (amount: number, method: string): Promise<Payment> => {
    if (USE_MOCK) {
      await delay(1000); // simulate payment gateway
      return {
        id: `pay_${Date.now()}`,
        bookingId: 'pending',
        amount,
        method: method as any,
        status: 'completed',
        transactionId: `TXN${Date.now()}`,
        paidAt: new Date().toISOString()
      };
    }
    throw new Error('API not implemented');
  }
};
