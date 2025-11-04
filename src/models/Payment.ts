// Modelo de Pago

import type { PaymentMethod } from './PaymentMethod';
import type { PaymentStatus } from './PaymentStatus';

export interface Payment {
  id: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  reservationId: number; // Referencia por ID en lugar de objeto completo
}