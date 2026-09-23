import { FareRule } from '@/types';

export const fareRules: FareRule[] = [
  {
    id: 'fr_1',
    trainId: 'tr_1',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    classType: '1A',
    baseFare: 3500,
    distanceRate: 2.5,
    reservationCharge: 60,
    superfastCharge: 75,
    gstPercent: 5,
    concessionPercent: 0,
    effectiveFrom: '2026-01-01T00:00:00Z',
    status: 'active',
  },
  {
    id: 'fr_2',
    trainId: 'tr_1',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    classType: '2A',
    baseFare: 2200,
    distanceRate: 1.5,
    reservationCharge: 50,
    superfastCharge: 45,
    gstPercent: 5,
    concessionPercent: 0,
    effectiveFrom: '2026-01-01T00:00:00Z',
    status: 'active',
  },
];
