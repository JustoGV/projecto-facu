// Enum para métodos de pago

export const PaymentMethod = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  PAYPAL: 'PAYPAL',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CASH: 'CASH'
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];