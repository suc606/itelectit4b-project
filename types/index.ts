// ==========================================
// 1. ENUMS (At least ONE enum)
// ==========================================
export enum UserRole {
  TUTOR = "tutor",
  TUTEE = "tutee",
  ADMIN = "admin",
}

export enum BookingStatus {
  REQUESTED = "requested",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// ==========================================
// 2. CORE ENTITIES (Peer Tutoring Booking Platform)
// ==========================================

// Core Entity 1: User (with role/type field: tutor | tutee | admin)
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  subjectSpecialization?: string[];
  bio?: string;
}

// Core Entity 2: Course / Tutoring Session
export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface TutoringSession {
  id: string;
  tutorId: number;
  courseCode: string;
  topic: string;
  description: string;
  schedule: string;
  maxTutees: number;
}

// Core Entity 3: Booking (multi-step status lifecycle enum)
export interface Submission {
  id: number;
  courseId: string;
  studentId: number;
  grade?: number;
}

export interface Booking {
  id: number;
  sessionId: string;
  tuteeId: number;
  tutorId: number;
  status: BookingStatus;
  requestedAt: string;
  notes?: string;
}

// Helper Union Type
export type StringOrNumber = string | number;

// ==========================================
// 3. GENERIC INTERFACE ApiResponse<T>
// ==========================================
export interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

// ==========================================
// 4. GENERIC FUNCTIONS (getById & getFirst)
// ==========================================
export function getById<T extends { id: StringOrNumber }>(items: T[], id: StringOrNumber): T | undefined {
  return items.find((item) => item.id === id);
}

export function getFirst<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

// ==========================================
// 5. UTILITY TYPE USES (Partial, Pick, Omit, Record)
// ==========================================
// Use 1: Partial<T> - Useful for updating user profile
export type UpdateUserDto = Partial<User>;

// Use 2: Omit<T, K> - Useful for creating new booking without system-generated ID
export type CreateBookingDto = Omit<Booking, "id">;

// Use 3: Pick<T, K> - Summary view of user for light queries
export type UserSummaryDto = Pick<User, "id" | "name" | "role">;

// Use 4: Record<K, V> - Map of active bookings indexed by ID
export type BookingDictionary = Record<number, Booking>;