// Enum para estados de reserva

export const ReservationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
} as const;

export type ReservationStatus = typeof ReservationStatus[keyof typeof ReservationStatus];