// Modelo de Alojamiento

import type { Location } from './Location';
import type { User } from './User';
import type { Amenity } from './Amenity';
import type { Image } from './Image';
import type { Review } from './Review';

export interface Accommodation {
  id: number;
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  location: Location;
  host: User;
  amenities: Amenity[];
  images: Image[];
  reviews: Review[];
}