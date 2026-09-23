import { Train } from '@/types';
import { stations } from './stations';

export const trains: Train[] = [
  {
    id: 'tr_1',
    number: '12951',
    name: 'Mumbai Rajdhani',
    type: 'Rajdhani',
    source: stations[0],
    destination: stations[2],
    departureTime: '17:00',
    arrivalTime: '08:32',
    duration: '15h 32m',
    distance: 1384,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { type: '1A', name: 'First AC', fare: 4850, availableSeats: 12, totalSeats: 24, status: 'confirmed' },
      { type: '2A', name: 'Second AC', fare: 2890, availableSeats: 45, totalSeats: 144, status: 'confirmed' },
      { type: '3A', name: 'Third AC', fare: 2065, availableSeats: 110, totalSeats: 320, status: 'confirmed' }
    ],
    stops: [
      { station: stations[0], arrivalTime: null, departureTime: '17:00', day: 1, distance: 0, platform: 1 },
      { station: stations[4], arrivalTime: '22:15', departureTime: '22:25', day: 1, distance: 493, haltDuration: '10m', platform: 3 },
      { station: stations[2], arrivalTime: '08:32', departureTime: null, day: 2, distance: 1384, platform: 3 }
    ],
    amenities: ['Meals Included', 'Bedding', 'Charging Points', 'Pantry Car'],
    status: 'active',
    pantryAvailable: true
  },
  {
    id: 'tr_2',
    number: '12002',
    name: 'Bhopal Shatabdi',
    type: 'Shatabdi',
    source: stations[2], // NDLS
    destination: stations[11], // BPL
    departureTime: '06:00',
    arrivalTime: '14:25',
    duration: '8h 25m',
    distance: 702,
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { type: 'EC', name: 'Executive Chair Car', fare: 2150, availableSeats: 20, totalSeats: 46, status: 'confirmed' },
      { type: 'CC', name: 'AC Chair Car', fare: 1120, availableSeats: 140, totalSeats: 350, status: 'confirmed' }
    ],
    stops: [
      { station: stations[2], arrivalTime: null, departureTime: '06:00', day: 1, distance: 0, platform: 1 },
      { station: stations[17], arrivalTime: '07:50', departureTime: '07:55', day: 1, distance: 195, haltDuration: '5m', platform: 1 }, // AGC
      { station: stations[11], arrivalTime: '14:25', departureTime: null, day: 1, distance: 702, platform: 1 }
    ],
    amenities: ['Meals Included', 'Charging Points', 'WiFi'],
    status: 'active',
    pantryAvailable: true
  }
];
