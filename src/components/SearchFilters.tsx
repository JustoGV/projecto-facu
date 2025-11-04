// Componente de filtros de búsqueda para alojamientos

import React, { useState } from 'react';
import '../styles/SearchFilters.css';

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  type: string;
}

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ 
  onFiltersChange, 
  initialFilters = {} 
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: initialFilters.location || '',
    checkIn: initialFilters.checkIn || '',
    checkOut: initialFilters.checkOut || '',
    guests: initialFilters.guests || 1,
    priceRange: initialFilters.priceRange || [0, 150000],
    type: initialFilters.type || 'all'
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = value;
    handleFilterChange('priceRange', newPriceRange);
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      priceRange: [0, 150000],
      type: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="search-filters">
      <div className="filters-header">
        <h3>Filtros de búsqueda</h3>
        <button className="btn-clear-filters" onClick={clearFilters}>
          Limpiar
        </button>
      </div>

      <div className="filters-grid">
        {/* Ubicación */}
        <div className="filter-group">
          <label htmlFor="location">📍 Ubicación</label>
          <input
            id="location"
            type="text"
            placeholder="¿A dónde vas?"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Fechas */}
        <div className="filter-group">
          <label htmlFor="checkin">📅 Entrada</label>
          <input
            id="checkin"
            type="date"
            min={today}
            value={filters.checkIn}
            onChange={(e) => handleFilterChange('checkIn', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="checkout">📅 Salida</label>
          <input
            id="checkout"
            type="date"
            min={filters.checkIn || today}
            value={filters.checkOut}
            onChange={(e) => handleFilterChange('checkOut', e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Huéspedes */}
        <div className="filter-group">
          <label htmlFor="guests">👥 Huéspedes</label>
          <select
            id="guests"
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', parseInt(e.target.value))}
            className="filter-select"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'huésped' : 'huéspedes'}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de alojamiento */}
        <div className="filter-group">
          <label htmlFor="type">🏠 Tipo</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos</option>
            <option value="apartment">Apartamento</option>
            <option value="house">Casa</option>
            <option value="hotel">Hotel</option>
            <option value="cabin">Cabaña</option>
          </select>
        </div>

        {/* Rango de precio */}
        <div className="filter-group price-range-group">
          <label>💰 Precio por noche</label>
          <div className="price-range-container">
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                max="200000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                className="price-input"
                placeholder="Min"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                min="0"
                max="200000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 0)}
                className="price-input"
                placeholder="Max"
              />
            </div>
            <div className="price-range-display">
              ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de filtros activos */}
      <div className="active-filters">
        {filters.location && (
          <span className="filter-tag">
            📍 {filters.location}
            <button onClick={() => handleFilterChange('location', '')}>×</button>
          </span>
        )}
        {filters.checkIn && (
          <span className="filter-tag">
            📅 {new Date(filters.checkIn).toLocaleDateString('es-ES')}
            <button onClick={() => handleFilterChange('checkIn', '')}>×</button>
          </span>
        )}
        {filters.guests > 1 && (
          <span className="filter-tag">
            👥 {filters.guests} huéspedes
            <button onClick={() => handleFilterChange('guests', 1)}>×</button>
          </span>
        )}
        {filters.type !== 'all' && (
          <span className="filter-tag">
            🏠 {filters.type}
            <button onClick={() => handleFilterChange('type', 'all')}>×</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFiltersComponent;