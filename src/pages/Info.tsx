// Página de información y reserva de alojamiento

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccommodationById } from '../data/accommodations';
import BookingForm, { type BookingData } from '../components/BookingForm';
import Navbar from '../components/Navbar';
import type { Accommodation } from '../data/accommodations';
import '../styles/Info.css';

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundAccommodation = getAccommodationById(parseInt(id));
      setAccommodation(foundAccommodation || null);
    }
    setLoading(false);
  }, [id]);

  const handleBookingSubmit = (bookingData: BookingData) => {
    // Aquí normalmente enviarías los datos a tu backend
    console.log('Booking submitted:', bookingData);
    
    // Simular una reserva exitosa
    alert(`¡Reserva confirmada para ${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}!\n\nDetalles:\n- Check-in: ${new Date(bookingData.checkIn).toLocaleDateString('es-ES')}\n- Check-out: ${new Date(bookingData.checkOut).toLocaleDateString('es-ES')}\n- Huéspedes: ${bookingData.guests}\n- Total: ${formatPrice(bookingData.totalPrice)}`);
    
    setShowBookingForm(false);
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!accommodation) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? accommodation.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === accommodation.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return (
      <div className="accommodation-detail">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando alojamiento...</p>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="accommodation-detail">
        <div className="not-found">
          <h2>Alojamiento no encontrado</h2>
          <p>Lo sentimos, no pudimos encontrar el alojamiento que buscas.</p>
          <button className="btn-back" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page">
      <Navbar />
      <div className="accommodation-detail">
      {/* Header */}
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="header-info">
          <h1>{accommodation.title}</h1>
          <div className="header-meta">
            <div className="location">
              📍 {accommodation.location}
            </div>
            <div className="rating">
              <span className="rating-star">⭐</span>
              <span className="rating-value">{accommodation.rating}</span>
              <span className="rating-reviews">({accommodation.reviews} reseñas)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className="image-gallery">
        <div className="main-image">
          <img 
            src={accommodation.images[currentImageIndex]} 
            alt={`${accommodation.title} - Imagen ${currentImageIndex + 1}`}
          />
          <button 
            className="nav-btn prev-btn" 
            onClick={() => handleImageNavigation('prev')}
            disabled={accommodation.images.length <= 1}
          >
            ‹
          </button>
          <button 
            className="nav-btn next-btn" 
            onClick={() => handleImageNavigation('next')}
            disabled={accommodation.images.length <= 1}
          >
            ›
          </button>
          <div className="image-counter">
            {currentImageIndex + 1} / {accommodation.images.length}
          </div>
        </div>
        
        <div className="image-thumbnails">
          {accommodation.images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={image} alt={`Vista ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          {/* Información básica */}
          <div className="basic-info">
            <div className="accommodation-type">
              {accommodation.type === 'apartment' && '🏠 Apartamento'}
              {accommodation.type === 'house' && '🏡 Casa'}
              {accommodation.type === 'hotel' && '🏨 Hotel'}
              {accommodation.type === 'cabin' && '🏘️ Cabaña'}
            </div>
            
            <div className="capacity-info">
              <span className="capacity-item">
                👥 {accommodation.maxGuests} huéspedes
              </span>
              <span className="capacity-item">
                🛏️ {accommodation.bedrooms} habitaciones
              </span>
              <span className="capacity-item">
                🚿 {accommodation.bathrooms} baños
              </span>
            </div>
          </div>

          {/* Descripción */}
          <div className="description-section">
            <h3>Descripción</h3>
            <p>{accommodation.description}</p>
          </div>

          {/* Amenidades */}
          <div className="amenities-section">
            <h3>¿Qué ofrece este lugar?</h3>
            <div className="amenities-grid">
              {accommodation.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">
                    {getAmenityIcon(amenity)}
                  </span>
                  <span className="amenity-name">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del anfitrión */}
          <div className="host-section">
            <h3>Anfitrión: {accommodation.host}</h3>
            <div className="host-info">
              <div className="host-avatar">
                {accommodation.host.charAt(0)}
              </div>
              <div className="host-details">
                <p>Tu anfitrión {accommodation.host} estará disponible para ayudarte durante tu estancia.</p>
                <div className="host-stats">
                  <span>⭐ {accommodation.rating} calificación promedio</span>
                  <span>💬 {accommodation.reviews} reseñas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de reserva */}
        <div className="booking-panel">
          <div className="price-info">
            <span className="price">{formatPrice(accommodation.price)}</span>
            <span className="price-period">noche</span>
          </div>
          
          <div className="availability-status">
            {accommodation.available ? (
              <span className="available">✅ Disponible</span>
            ) : (
              <span className="unavailable">❌ No disponible</span>
            )}
          </div>

          <button 
            className="btn-reserve"
            onClick={() => setShowBookingForm(true)}
            disabled={!accommodation.available}
          >
            {accommodation.available ? 'Reservar ahora' : 'No disponible'}
          </button>

          <div className="booking-note">
            <small>No se realizará ningún cargo todavía</small>
          </div>

          <div className="quick-info">
            <div className="info-item">
              <strong>Cancelación gratuita</strong>
              <small>Hasta 24 horas antes</small>
            </div>
            <div className="info-item">
              <strong>Check-in</strong>
              <small>Después de las 15:00</small>
            </div>
            <div className="info-item">
              <strong>Check-out</strong>
              <small>Antes de las 11:00</small>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de reserva */}
      {showBookingForm && (
        <BookingForm
          accommodation={accommodation}
          onBookingSubmit={handleBookingSubmit}
          onCancel={() => setShowBookingForm(false)}
        />
      )}
      </div>
    </div>
  );
};

// Función auxiliar para obtener iconos de amenidades
const getAmenityIcon = (amenity: string): string => {
  const iconMap: Record<string, string> = {
    'WiFi': '📶',
    'Cocina': '🍳',
    'Aire acondicionado': '❄️',
    'TV': '📺',
    'Lavadora': '🧺',
    'Piscina': '🏊‍♂️',
    'Jardín': '🌿',
    'Barbacoa': '🔥',
    'Parking': '🚗',
    'Vista al mar': '🌊',
    'Desayuno incluido': '🥐',
    'Recepción 24h': '🏨',
    'Spa': '💆‍♀️',
    'Gimnasio': '💪',
    'Room service': '🍽️',
    'Chimenea': '🔥',
    'Senderismo': '🥾',
    'Vistas a la montaña': '🏔️',
    'Cocina moderna': '🍳',
    'TV Smart': '📱',
    'Escritorio': '💻',
    'Piscina privada': '🏊‍♂️',
    'Patio': '🏡',
    'Cocina completa': '👨‍🍳'
  };
  
  return iconMap[amenity] || '✅';
};

export default Info;