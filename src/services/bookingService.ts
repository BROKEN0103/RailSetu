import { Booking } from '@/types';
import { bookings } from '@/data/bookings';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    if (USE_MOCK) {
      await delay(500);
      return bookings.filter(b => b.userId === userId);
    }
    throw new Error('API not implemented');
  },

  getBookingByPnr: async (pnr: string): Promise<Booking | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return bookings.find(b => b.pnr === pnr);
    }
    throw new Error('API not implemented');
  },

  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    if (USE_MOCK) {
      await delay(800);
      const newBooking = { ...bookings[0], id: `bk_${Date.now()}`, pnr: Math.floor(Math.random() * 10000000000).toString(), ...bookingData } as Booking;
      return newBooking;
    }
    throw new Error('API not implemented');
  }
};
