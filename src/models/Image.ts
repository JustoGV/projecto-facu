// Modelo de Imagen

export interface Image {
  id: number;
  url: string;
  description?: string;
  accommodationId: number; // Referencia por ID en lugar de objeto completo
}