// Tarjeta de alojamiento para mostrar información básica

import React from 'react';
import type { Accommodation } from '../data/accommodations';
import '../styles/AccommodationCard.css';

interface AccommodationCardProps {
  accommodation: Accommodation;
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
        <img src={accommodation.image} alt={accommodation.title} />
        <div className="card-badge">
          {accommodation.type === 'apartment' && '🏠'}
          {accommodation.type === 'house' && '🏡'}
          {accommodation.type === 'hotel' && '🏨'}
          {accommodation.type === 'cabin' && '🏘️'}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{accommodation.title}</h3>
          <div className="card-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{accommodation.rating}</span>
            <span className="rating-reviews">({accommodation.reviews})</span>
          </div>
        </div>
        
        <p className="card-location">📍 {accommodation.location}</p>
        
        <div className="card-details">
          <span className="detail-item">
            👥 {accommodation.maxGuests} huéspedes
          </span>
          <span className="detail-item">
            🛏️ {accommodation.bedrooms} habitaciones
          </span>
          <span className="detail-item">
            🚿 {accommodation.bathrooms} baños
          </span>
        </div>
        
        <div className="card-amenities">
          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
          {accommodation.amenities.length > 3 && (
            <span className="amenity-more">+{accommodation.amenities.length - 3} más</span>
          )}
        </div>
        
        <div className="card-footer">
          <div className="price-section">
            <span className="price">{formatPrice(accommodation.price)}</span>
            <span className="price-period">/ noche</span>
          </div>
          <button 
            className="btn-book-now" 
            onClick={handleBookNow}
            disabled={!accommodation.available}
          >
            {accommodation.available ? 'Reservar' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;