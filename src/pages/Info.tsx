// Página de información y reserva de alojamiento

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccommodationById as getAccommodationByIdAPI, handleApiError } from '../services/api';
// import BookingForm, { type BookingData } from '../components/BookingForm';
import Navbar from '../components/Navbar';
import '../styles/Info.css';

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
  host: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
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
    user: {
      firstName: string;
      lastName: string;
    };
  }>;
}

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState<BackendAccommodation | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Imágenes hardcodeadas para la galería
  const getHardcodedImages = (accommodationId: number) => {
    const imagesSets = [
      [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      ],
      [
        'https://images.unsplash.com/photo-1567496898669-ee935f5317ac?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      ],
      [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1494203484021-3c454daf4c7f?w=800&h=600&fit=crop',
      ],
    ];
    
    return imagesSets[accommodationId % imagesSets.length];
  };

  useEffect(() => {
    const loadAccommodation = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await getAccommodationByIdAPI(parseInt(id));
        setAccommodation(data);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error loading accommodation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAccommodation();
  }, [id]);

  /* const handleBookingSubmit = (bookingData: BookingData) => {
    // Aquí normalmente enviarías los datos a tu backend
    console.log('Booking submitted:', bookingData);
    
    // Simular una reserva exitosa
    alert(`¡Reserva confirmada para ${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}!\n\nDetalles:\n- Check-in: ${new Date(bookingData.checkIn).toLocaleDateString('es-ES')}\n- Check-out: ${new Date(bookingData.checkOut).toLocaleDateString('es-ES')}\n- Huéspedes: ${bookingData.guests}\n- Total: ${formatPrice(bookingData.totalPrice)}`);
    
    setShowBookingForm(false);
    navigate('/');
  }; */

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!accommodation) return;
    
    const hardcodedImages = getHardcodedImages(accommodation.id);
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? hardcodedImages.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === hardcodedImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return (
      <div className="info-page">
        <Navbar />
        <div className="accommodation-detail">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Cargando alojamiento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="info-page">
        <Navbar />
        <div className="accommodation-detail">
          <div className="not-found">
            <h2>Error al cargar alojamiento</h2>
            <p>{error}</p>
            <button className="btn-back" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="info-page">
        <Navbar />
        <div className="accommodation-detail">
          <div className="not-found">
            <h2>Alojamiento no encontrado</h2>
            <p>Lo sentimos, no pudimos encontrar el alojamiento que buscas.</p>
            <button className="btn-back" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>
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
                      <p className="accommodation-location">
              📍 {accommodation.location.city}, {accommodation.location.country}
            </p>
            <div className="accommodation-rating">
              <span className="rating-star">⭐</span>
              <span className="rating-value">
                {accommodation.reviews && accommodation.reviews.length > 0 
                  ? (accommodation.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / accommodation.reviews.length).toFixed(1)
                  : 'Sin calificar'
                }
              </span>
              <span className="rating-reviews">({accommodation.reviews ? accommodation.reviews.length : 0} reseñas)</span>
            </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className="image-gallery">
        <div className="main-image">
          <img 
            src={getHardcodedImages(accommodation.id)[currentImageIndex]} 
            alt={`${accommodation.title} - Imagen ${currentImageIndex + 1}`}
          />
          <button 
            className="nav-btn prev-btn" 
            onClick={() => handleImageNavigation('prev')}
            disabled={getHardcodedImages(accommodation.id).length <= 1}
          >
            ‹
          </button>
          <button 
            className="nav-btn next-btn" 
            onClick={() => handleImageNavigation('next')}
            disabled={getHardcodedImages(accommodation.id).length <= 1}
          >
            ›
          </button>
          <div className="image-counter">
            {currentImageIndex + 1} / {accommodation.images.length}
          </div>
        </div>
        
        <div className="thumbnails">
          {getHardcodedImages(accommodation.id).map((imageUrl, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={imageUrl} alt={`Vista ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          {/* Información básica */}
          <div className="basic-info">
                        <div className="property-type">
              🏠 Alojamiento
            </div>
            
            <div className="property-features">
              <div className="feature">
                👥 {accommodation.maxGuests} huéspedes
              </div>
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
              {accommodation.amenities.map((amenity) => (
                <div key={amenity.id} className="amenity-item">
                  <span className="amenity-icon">
                    {getAmenityIcon(amenity.name)}
                  </span>
                  <span className="amenity-name">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del anfitrión */}
          <div className="host-section">
            <h3>Anfitrión: {accommodation.host.fullName || `${accommodation.host.firstName} ${accommodation.host.lastName}`}</h3>
            <div className="host-info">
              <div className="host-avatar">
                {accommodation.host.firstName ? accommodation.host.firstName.charAt(0) : 'H'}
              </div>
              <div className="host-details">
                <p>Tu anfitrión {accommodation.host.fullName || `${accommodation.host.firstName} ${accommodation.host.lastName}`} estará disponible para ayudarte durante tu estancia.</p>
                <div className="host-stats">
                  <span>⭐ {accommodation.reviews && accommodation.reviews.length > 0 
                    ? (accommodation.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / accommodation.reviews.length).toFixed(1)
                    : 'Sin calificar'
                  } calificación promedio</span>
                  <span>💬 {accommodation.reviews ? accommodation.reviews.length : 0} reseñas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de reserva */}
        <div className="booking-panel">
          <div className="price-info">
            <span className="price">{formatPrice(accommodation.pricePerNight)}</span>
            <span className="price-period">noche</span>
          </div>
          
          <div className="availability-status">
            <span className="available">✅ Disponible</span>
          </div>

          <button 
            className="btn-reserve"
            onClick={() => setShowBookingForm(true)}
          >
            Reservar ahora
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

      {/* Modal de reserva temporalmente deshabilitado */}
      {/* {showBookingForm && (
        <BookingForm
          accommodation={accommodation}
          onBookingSubmit={handleBookingSubmit}
          onCancel={() => setShowBookingForm(false)}
        />
      )} */}
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