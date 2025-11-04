// Modelo de Ubicación

export interface Location {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  province: string;
  country: string;
}