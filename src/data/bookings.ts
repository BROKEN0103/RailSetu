import { Booking } from '@/types';
import { trains } from './trains';
import { stations } from './stations';
import { users } from './users';

export const bookings: Booking[] = [
  {
    id: 'bk_1',
    pnr: '4532189670',
    userId: users[0].id,
    train: trains[0],
    journeyDate: '2026-10-15',
    boardingStation: stations[0],
    destinationStation: stations[2],
    coach: 'A1',
    seatNumbers: ['12', '14'],
    passengers: [
      { id: 'p_1', fullName: 'Rahul Sharma', age: 34, gender: 'male', seatPreference: 'lower' },
      { id: 'p_2', fullName: 'Neha Sharma', age: 31, gender: 'female', seatPreference: 'lower' }
    ],
    classType: '2A',
    status: 'confirmed',
    fare: {
      baseFare: 5500,
      reservationCharge: 100,
      superfastCharge: 90,
      gst: 285,
      totalFare: 5975,
      concession: 0
    },
    payment: {
      id: 'pay_1',
      bookingId: 'bk_1',
      amount: 5975,
      method: 'upi',
      status: 'completed',
      transactionId: 'TXN8934729384',
      paidAt: '2026-10-01T10:30:00Z'
    },
    bookedAt: '2026-10-01T10:30:00Z'
  },
  {
    id: 'bk_2',
    pnr: '4532189671',
    userId: users[1].id,
    train: trains[1],
    journeyDate: '2026-10-20',
    boardingStation: stations[2],
    destinationStation: stations[11],
    coach: 'C1',
    seatNumbers: ['45'],
    passengers: [
      { id: 'p_3', fullName: 'Priya Patel', age: 28, gender: 'female', seatPreference: 'window' }
    ],
    classType: 'CC',
    status: 'rac',
    fare: {
      baseFare: 1050,
      reservationCharge: 40,
      superfastCharge: 0,
      gst: 30,
      totalFare: 1120,
      concession: 0
    },
    payment: {
      id: 'pay_2',
      bookingId: 'bk_2',
      amount: 1120,
      method: 'card',
      status: 'completed',
      transactionId: 'TXN8934729385',
      paidAt: '2026-10-05T14:20:00Z'
    },
    bookedAt: '2026-10-05T14:20:00Z'
  }
];
