import React, { createContext, useContext, useState } from 'react';

// Mock types
export interface SearchParams {
  fromStation: string;
  toStation: string;
  date: string;
  class: string;
  passengers: number;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  [key: string]: any;
}

export interface Seat {
  coach: string;
  number: string;
  type: string;
}

export interface Passenger {
  id: string;
  name: string;
  age: string;
  gender: string;
  berthPreference: string;
}

export interface FareBreakdown {
  baseFare: number;
  reservationCharge: number;
  superfastCharge: number;
  gst: number;
  totalAmount: number;
}

interface BookingContextType {
  searchParams: SearchParams | null;
  selectedTrain: Train | null;
  selectedClass: string;
  selectedCoach: string;
  selectedSeats: Seat[];
  passengers: Passenger[];
  fareBreakdown: FareBreakdown | null;
  setSearchParams: (params: SearchParams) => void;
  setSelectedTrain: (train: Train) => void;
  setSelectedClass: (cls: string) => void;
  setSelectedCoach: (coach: string) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatNumber: string) => void;
  addPassenger: (passenger: Passenger) => void;
  removePassenger: (id: string) => void;
  updatePassenger: (id: string, data: Partial<Passenger>) => void;
  calculateFare: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParamsState] = useState<SearchParams | null>(null);
  const [selectedTrain, setSelectedTrainState] = useState<Train | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [fareBreakdown, setFareBreakdown] = useState<FareBreakdown | null>(null);

  const setSearchParams = (params: SearchParams) => setSearchParamsState(params);
  const setSelectedTrain = (train: Train) => setSelectedTrainState(train);

  const addSeat = (seat: Seat) => {
    setSelectedSeats(prev => [...prev, seat]);
  };

  const removeSeat = (seatNumber: string) => {
    setSelectedSeats(prev => prev.filter(s => s.number !== seatNumber));
  };

  const addPassenger = (passenger: Passenger) => {
    setPassengers(prev => [...prev, passenger]);
  };

  const removePassenger = (id: string) => {
    setPassengers(prev => prev.filter(p => p.id !== id));
  };

  const updatePassenger = (id: string, data: Partial<Passenger>) => {
    setPassengers(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const calculateFare = () => {
    if (!selectedTrain || passengers.length === 0) return;
    // Mock calculation
    const count = passengers.length;
    const base = count * 850;
    setFareBreakdown({
      baseFare: base,
      reservationCharge: count * 40,
      superfastCharge: count * 30,
      gst: base * 0.05,
      totalAmount: base + (count * 70) + (base * 0.05)
    });
  };

  const resetBooking = () => {
    setSelectedTrainState(null);
    setSelectedClass('');
    setSelectedCoach('');
    setSelectedSeats([]);
    setPassengers([]);
    setFareBreakdown(null);
  };

  const value = {
    searchParams,
    selectedTrain,
    selectedClass,
    selectedCoach,
    selectedSeats,
    passengers,
    fareBreakdown,
    setSearchParams,
    setSelectedTrain,
    setSelectedClass,
    setSelectedCoach,
    addSeat,
    removeSeat,
    addPassenger,
    removePassenger,
    updatePassenger,
    calculateFare,
    resetBooking
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
