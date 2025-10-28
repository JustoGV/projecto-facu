// Datos de ejemplo para alojamientos

export interface Accommodation {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  images: string[];
  type: 'apartment' | 'house' | 'hotel' | 'cabin';
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  reviews: number;
  host: string;
  available: boolean;
}

export const mockAccommodations: Accommodation[] = [
  {
    id: 1,
    title: "Apartamento moderno en el centro",
    description: "Hermoso apartamento completamente equipado en el corazón de la ciudad. Perfecto para viajeros de negocios o turistas que quieren estar cerca de todo.",
    price: 85,
    location: "Madrid, España",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    type: 'apartment',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'TV', 'Lavadora'],
    rating: 4.8,
    reviews: 127,
    host: "María García",
    available: true
  },
  {
    id: 2,
    title: "Casa rural con vistas al mar",
    description: "Encantadora casa rural ubicada en la costa con vistas espectaculares al mar. Ideal para desconectar y disfrutar de la naturaleza.",
    price: 120,
    location: "Valencia, España",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop"
    ],
    type: 'house',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Piscina', 'Jardín', 'Barbacoa', 'Parking', 'Vista al mar'],
    rating: 4.9,
    reviews: 89,
    host: "Carlos Martínez",
    available: true
  },
  {
    id: 3,
    title: "Hotel boutique en Barcelona",
    description: "Elegante hotel boutique en el Barrio Gótico de Barcelona. Combinación perfecta de historia y lujo moderno.",
    price: 150,
    location: "Barcelona, España",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"
    ],
    type: 'hotel',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Desayuno incluido', 'Recepción 24h', 'Spa', 'Gimnasio', 'Room service'],
    rating: 4.7,
    reviews: 203,
    host: "Hotel Barcelona",
    available: true
  },
  {
    id: 4,
    title: "Cabaña en la montaña",
    description: "Acogedora cabaña de madera en plena montaña. Perfecta para una escapada romántica o vacaciones en familia rodeados de naturaleza.",
    price: 95,
    location: "Asturias, España",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    type: 'cabin',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Chimenea', 'Cocina', 'Senderismo', 'Parking', 'Vistas a la montaña'],
    rating: 4.6,
    reviews: 74,
    host: "Ana López",
    available: true
  },
  {
    id: 5,
    title: "Loft industrial en Bilbao",
    description: "Moderno loft con diseño industrial en el centro de Bilbao. Espacio único y creativo cerca del Museo Guggenheim.",
    price: 110,
    location: "Bilbao, España",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
    ],
    type: 'apartment',
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Aire acondicionado', 'Cocina moderna', 'TV Smart', 'Escritorio'],
    rating: 4.5,
    reviews: 156,
    host: "David Ruiz",
    available: true
  },
  {
    id: 6,
    title: "Villa con piscina en Sevilla",
    description: "Espaciosa villa andaluza con piscina privada y patio tradicional. Perfecta para grupos grandes que buscan lujo y comodidad.",
    price: 200,
    location: "Sevilla, España",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615529143937-a6b6d2b2b4dd?w=800&h=600&fit=crop"
    ],
    type: 'house',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['WiFi', 'Piscina privada', 'Patio', 'Aire acondicionado', 'Cocina completa', 'Parking'],
    rating: 4.9,
    reviews: 91,
    host: "Carmen Jiménez",
    available: true
  }
];

export const getAccommodationById = (id: number): Accommodation | undefined => {
  return mockAccommodations.find(acc => acc.id === id);
};

export const getAccommodationsByLocation = (location: string): Accommodation[] => {
  return mockAccommodations.filter(acc => 
    acc.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getAccommodationsByType = (type: string): Accommodation[] => {
  return mockAccommodations.filter(acc => acc.type === type);
};