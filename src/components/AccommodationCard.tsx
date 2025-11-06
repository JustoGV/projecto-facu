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
          src={accommodation.images && accommodation.images.length > 0 
            ? `/images/${accommodation.images[0].url}` 
            : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop'
          } 
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