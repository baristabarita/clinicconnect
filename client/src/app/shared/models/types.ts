// User related types
export interface User {
  userID: number;
  email: string;
  fname: string;
  lname: string;
  mname?: string;
  age?: number;
  gender?: string;
  contact?: string;
  birthday?: Date;
  userType: UserType;
  profileImagePath?: string;
  profileImageUpdatedAt?: Date;
}

export interface AuthResponse {
  token: string;
  userType: UserType;
  email: string;
  fname: string;
  lname: string;
  mname?: string;
  contact?: string;
  birthday?: string;
  age?: number;
  gender?: string;
  userID?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<User, 'id'> {
  password: string;
  confirmPassword?: string;
}

// Enum for User Types
export enum UserType {
  STAFF = 'STAFF',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN'
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

// Form Error type
export interface FormErrors {
  [key: string]: string;
}

// Appointment related types (Modify if necessary)
export interface Appointment {
  aptID: number;
  userID: number;
  doctorID: number;
  visitDate: Date;
  visitTime: string;
  purpose?: string;
  status: string;
  isDeleted?: boolean;
}

// Staff related types
export interface Staff {
  userID: number;
  fname: string;
  lname: string;
  mname?: string;
  email: string;
  specialty?: string;
  status: string;
  profileImagePath?: string;
  profileImageUpdatedAt?: Date;
}

// Doctor related types
export interface Doctor {
  doctorID?: number;
  fname: string;
  lname: string;
  mname?: string;
  email: string;
  specialty?: string;
  status: string;
  profileImagePath?: string;
  profileImageUpdatedAt?: Date;
}

export interface DoctorAvailability {
    availabilityID?: number;
    doctorID: number;
    doctor?: Doctor;
    startDate: string;
    endDate: string;
    availabilityType: 'AVAILABLE' | 'ON_LEAVE' | 'PARTIALLY_AVAILABLE';
    notes?: string;
}