// Modelo de Reserva

import type { User } from './User';
import type { Payment } from './Payment';
import type { ReservationStatus } from './ReservationStatus';

export interface Reservation {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  status: ReservationStatus;
  accommodationId: number; // Referencia por ID en lugar de objeto completo
  user: User;
  payment?: Payment;
}