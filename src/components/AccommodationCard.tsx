// Tarjeta de alojamiento para mostrar información básica

import React from 'react';
import '../styles/AccommodationCard.css';

// Interfaz para los datos que vienen del backend
interface BackendAccommodation {
  id: number;
  title: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  location: {
    city: string;
    country: string;
    address: string;
  };
  amenities: Array<{
    id: number;
    name: string;
  }>;
  images: Array<{
    id: number;
    url: string;
  }>;
  reviews: Array<{
    id: number;
    rating: number;
    comment: string;
  }>;
}

interface AccommodationCardProps {
  accommodation: BackendAccommodation;
  onBookNow?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ 
  accommodation, 
  onBookNow, 
  onViewDetails 
}) => {
  // Imágenes hardcodeadas
  const hardcodedImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1567496898669-ee935f5317ac?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4bb?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1520637736862-4d197d17c55a?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1498889444388-e67ea62c464b?w=500&h=300&fit=crop',
  ];

  const getImageForAccommodation = (id: number) => {
    return hardcodedImages[id % hardcodedImages.length];
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow(accommodation.id);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(accommodation.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="accommodation-card" onClick={handleCardClick}>
      <div className="card-image">
        <img 
          src={getImageForAccommodation(accommodation.id)} 
          alt={accommodation.title} 
        />
        <div className="card-badge">
          �
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{accommodation.title}</h3>
          <div className="card-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">
              {accommodation.reviews && accommodation.reviews.length > 0 
                ? (accommodation.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / accommodation.reviews.length).toFixed(1)
                : 'Sin calificar'
              }
            </span>
            <span className="rating-reviews">
              ({accommodation.reviews ? accommodation.reviews.length : 0})
            </span>
          </div>
        </div>
        
        <p className="card-location">
          📍 {accommodation.location ? `${accommodation.location.city}, ${accommodation.location.country}` : 'Ubicación no especificada'}
        </p>
        
        <div className="card-details">
          <span className="detail-item">
            👥 {accommodation.maxGuests} huéspedes
          </span>
        </div>
        
        <div className="card-amenities">
          {accommodation.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity.id} className="amenity-tag">
              {amenity.name}
            </span>
          ))}
          {accommodation.amenities.length > 3 && (
            <span className="amenity-more">+{accommodation.amenities.length - 3} más</span>
          )}
        </div>
        
        <div className="card-footer">
          <div className="price-section">
            <span className="price">{formatPrice(accommodation.pricePerNight)}</span>
            <span className="price-period">/ noche</span>
          </div>
          <button 
            className="btn-book-now" 
            onClick={handleBookNow}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;