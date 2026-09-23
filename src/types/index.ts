// User types
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'passenger' | 'admin' | 'staff';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Station type
export interface Station {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string;
  status: 'active' | 'inactive';
}

// Train types
export type TrainType = 'Rajdhani' | 'Shatabdi' | 'Duronto' | 'Superfast' | 'Express' | 'Mail' | 'Intercity' | 'Garib Rath' | 'Humsafar' | 'Tejas' | 'Vande Bharat';
export type TrainStatus = 'active' | 'inactive' | 'cancelled' | 'delayed';
export type CoachType = '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC' | '2S' | 'GN';
export type SeatStatus = 'available' | 'selected' | 'occupied' | 'reserved' | 'ladies' | 'disabled';
export type BookingStatus = 'confirmed' | 'rac' | 'waiting' | 'cancelled';
export type PaymentMethod = 'upi' | 'card' | 'netbanking';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type Gender = 'male' | 'female' | 'other';
export type TripType = 'one-way' | 'round-trip';

export interface Coach {
  id: string;
  name: string;
  type: CoachType;
  totalSeats: number;
  availableSeats: number;
}

export interface Seat {
  id: string;
  number: string;
  position: 'lower' | 'middle' | 'upper' | 'side-lower' | 'side-upper' | 'window' | 'aisle' | 'middle-seat';
  status: SeatStatus;
  price: number;
}

export interface TrainStop {
  station: Station;
  arrivalTime: string | null;
  departureTime: string | null;
  day: number;
  platform?: number;
  haltDuration?: string;
  distance: number;
}

export interface ClassInfo {
  type: CoachType;
  name: string;
  fare: number;
  availableSeats: number;
  totalSeats: number;
  status: BookingStatus;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  type: TrainType;
  source: Station;
  destination: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  runningDays: string[];
  classes: ClassInfo[];
  stops: TrainStop[];
  amenities: string[];
  status: TrainStatus;
  pantryAvailable: boolean;
}

// Passenger
export interface Passenger {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  phone?: string;
  email?: string;
  idType?: 'aadhar' | 'pan' | 'passport' | 'voter-id';
  idNumber?: string;
  seatPreference?: string;
}

// Booking
export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  train: Train;
  journeyDate: string;
  boardingStation: Station;
  destinationStation: Station;
  coach: string;
  seatNumbers: string[];
  passengers: Passenger[];
  classType: CoachType;
  status: BookingStatus;
  fare: FareBreakdown;
  payment: Payment;
  bookedAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

// Fare
export interface FareBreakdown {
  baseFare: number;
  reservationCharge: number;
  superfastCharge: number;
  gst: number;
  totalFare: number;
  concession: number;
}

// Payment
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

// Schedule
export interface Schedule {
  id: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  stationId: string;
  stationName: string;
  stationCode: string;
  arrival: string | null;
  departure: string | null;
  day: number;
  platform: number;
  status: 'on-time' | 'delayed' | 'cancelled';
}

// Fare Rule
export interface FareRule {
  id: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  classType: CoachType;
  baseFare: number;
  distanceRate: number;
  reservationCharge: number;
  superfastCharge: number;
  gstPercent: number;
  concessionPercent: number;
  effectiveFrom: string;
  effectiveTo?: string;
  status: 'active' | 'inactive';
}

// Search
export interface SearchParams {
  from: string;
  to: string;
  date: string;
  classType?: CoachType;
  passengers?: number;
  tripType: TripType;
  returnDate?: string;
}

// Dashboard
export interface DashboardStats {
  totalTrains: number;
  activeTrains: number;
  todayBookings: number;
  todayRevenue: number;
  activeUsers: number;
  cancelledTickets: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

// Audit Log
export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  recordId: string;
  details: string;
  ipAddress: string;
  device: string;
  status: 'success' | 'failure';
}

// Report
export interface Report {
  id: string;
  type: string;
  title: string;
  dateRange: { from: string; to: string };
  data: Record<string, unknown>;
  generatedAt: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}
