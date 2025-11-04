// Modelo de Reseña

import type { User } from './User';

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  accommodationId: number; // Referencia por ID en lugar de objeto completo
  user: User;
}