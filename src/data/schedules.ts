import { Schedule } from '@/types';

export const schedules: Schedule[] = [
  {
    id: 'sch_1',
    trainId: 'tr_1',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    stationId: 'st_1',
    stationName: 'Mumbai Central',
    stationCode: 'MMCT',
    arrival: null,
    departure: '17:00',
    day: 1,
    platform: 1,
    status: 'on-time'
  },
  {
    id: 'sch_2',
    trainId: 'tr_1',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    stationId: 'st_5',
    stationName: 'Ahmedabad Junction',
    stationCode: 'ADI',
    arrival: '22:15',
    departure: '22:25',
    day: 1,
    platform: 3,
    status: 'on-time'
  },
  {
    id: 'sch_3',
    trainId: 'tr_1',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    stationId: 'st_3',
    stationName: 'New Delhi',
    stationCode: 'NDLS',
    arrival: '08:32',
    departure: null,
    day: 2,
    platform: 3,
    status: 'on-time'
  }
];
