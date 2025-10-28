// Formulario de reserva de alojamiento

import React, { useState } from 'react';
import type { Accommodation } from '../data/accommodations';
import '../styles/BookingForm.css';

interface BookingFormProps {
  accommodation: Accommodation;
  onBookingSubmit?: (bookingData: BookingData) => void;
  onCancel?: () => void;
}

export interface BookingData {
  accommodationId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  totalPrice: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  accommodation,
  onBookingSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calcular número de noches y precio total
  const calculateBookingDetails = () => {
    if (!formData.checkIn || !formData.checkOut) {
      return { nights: 0, totalPrice: 0 };
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = nights * accommodation.price;

    return { nights: Math.max(0, nights), totalPrice };
  };

  const { nights, totalPrice } = calculateBookingDetails();

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('guestInfo.')) {
      const guestField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        guestInfo: {
          ...prev.guestInfo,
          [guestField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar fechas
    if (!formData.checkIn) {
      newErrors.checkIn = 'La fecha de entrada es requerida';
    }
    if (!formData.checkOut) {
      newErrors.checkOut = 'La fecha de salida es requerida';
    }
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'La fecha de salida debe ser posterior a la entrada';
      }
    }

    // Validar huéspedes
    if (formData.guests < 1) {
      newErrors.guests = 'Debe haber al menos 1 huésped';
    }
    if (formData.guests > accommodation.maxGuests) {
      newErrors.guests = `Máximo ${accommodation.maxGuests} huéspedes`;
    }

    // Validar información del huésped
    if (!formData.guestInfo.firstName.trim()) {
      newErrors['guestInfo.firstName'] = 'El nombre es requerido';
    }
    if (!formData.guestInfo.lastName.trim()) {
      newErrors['guestInfo.lastName'] = 'El apellido es requerido';
    }
    if (!formData.guestInfo.email.trim()) {
      newErrors['guestInfo.email'] = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.guestInfo.email)) {
      newErrors['guestInfo.email'] = 'Email inválido';
    }
    if (!formData.guestInfo.phone.trim()) {
      newErrors['guestInfo.phone'] = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bookingData: BookingData = {
      accommodationId: accommodation.id,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      totalNights: nights,
      totalPrice: totalPrice,
      guestInfo: formData.guestInfo,
      specialRequests: formData.specialRequests || undefined
    };

    if (onBookingSubmit) {
      onBookingSubmit(bookingData);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form">
        <div className="form-header">
          <h2>Reservar alojamiento</h2>
          {onCancel && (
            <button className="btn-close" onClick={onCancel}>
              ×
            </button>
          )}
        </div>

        <div className="accommodation-summary">
          <img src={accommodation.image} alt={accommodation.title} />
          <div className="summary-details">
            <h3>{accommodation.title}</h3>
            <p>📍 {accommodation.location}</p>
            <div className="price-display">
              <span className="price">{formatPrice(accommodation.price)}</span>
              <span className="period">/ noche</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Fechas y huéspedes */}
          <div className="form-section">
            <h4>Detalles de la reserva</h4>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="checkIn">Fecha de entrada</label>
                <input
                  id="checkIn"
                  type="date"
                  min={today}
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  className={errors.checkIn ? 'error' : ''}
                />
                {errors.checkIn && <span className="error-text">{errors.checkIn}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="checkOut">Fecha de salida</label>
                <input
                  id="checkOut"
                  type="date"
                  min={formData.checkIn || tomorrow}
                  value={formData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  className={errors.checkOut ? 'error' : ''}
                />
                {errors.checkOut && <span className="error-text">{errors.checkOut}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="guests">Número de huéspedes</label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className={errors.guests ? 'error' : ''}
                >
                  {Array.from({ length: accommodation.maxGuests }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'huésped' : 'huéspedes'}
                    </option>
                  ))}
                </select>
                {errors.guests && <span className="error-text">{errors.guests}</span>}
              </div>
            </div>
          </div>

          {/* Información del huésped */}
          <div className="form-section">
            <h4>Información del huésped principal</h4>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.guestInfo.firstName}
                  onChange={(e) => handleInputChange('guestInfo.firstName', e.target.value)}
                  className={errors['guestInfo.firstName'] ? 'error' : ''}
                />
                {errors['guestInfo.firstName'] && <span className="error-text">{errors['guestInfo.firstName']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.guestInfo.lastName}
                  onChange={(e) => handleInputChange('guestInfo.lastName', e.target.value)}
                  className={errors['guestInfo.lastName'] ? 'error' : ''}
                />
                {errors['guestInfo.lastName'] && <span className="error-text">{errors['guestInfo.lastName']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.guestInfo.email}
                  onChange={(e) => handleInputChange('guestInfo.email', e.target.value)}
                  className={errors['guestInfo.email'] ? 'error' : ''}
                />
                {errors['guestInfo.email'] && <span className="error-text">{errors['guestInfo.email']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.guestInfo.phone}
                  onChange={(e) => handleInputChange('guestInfo.phone', e.target.value)}
                  className={errors['guestInfo.phone'] ? 'error' : ''}
                />
                {errors['guestInfo.phone'] && <span className="error-text">{errors['guestInfo.phone']}</span>}
              </div>
            </div>
          </div>

          {/* Solicitudes especiales */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="specialRequests">Solicitudes especiales (opcional)</label>
              <textarea
                id="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Ej: Hora de llegada estimada, necesidades especiales, etc."
              />
            </div>
          </div>

          {/* Resumen de precio */}
          {nights > 0 && (
            <div className="price-summary">
              <h4>Resumen de precio</h4>
              <div className="price-breakdown">
                <div className="price-item">
                  <span>{formatPrice(accommodation.price)} × {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="price-total">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="form-actions">
            {onCancel && (
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-confirm" disabled={nights <= 0}>
              Confirmar reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;