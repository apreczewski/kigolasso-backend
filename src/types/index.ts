// Common types shared across the application

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  PLAYER = 'PLAYER',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN',
}

// Team related types
export interface Team {
  id: string;
  name: string;
  description?: string;
  photo?: string;
  organizerId: string;
  memberLimit: number;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Game related types
export interface Game {
  id: string;
  title: string;
  description?: string;
  teamId: string;
  date: Date;
  duration: number; // in minutes
  location: string;
  price: number; // in cents
  playerLimit: number;
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum GameStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// Payment related types
export interface Payment {
  id: string;
  gameId: string;
  userId: string;
  amount: number; // in cents
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}