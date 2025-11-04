// Enum para los roles de usuario

export const Role = {
  GUEST: 'GUEST',
  HOST: 'HOST',
  ADMIN: 'ADMIN'
} as const;

export type Role = typeof Role[keyof typeof Role];

export default Role;