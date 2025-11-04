// Modelo de Usuario

import type { Role } from './Role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  country: string;
  province: string;
  city: string;
  isVerified: boolean;
  isActive: boolean;
  profilePictureUrl?: string;
  bio?: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}