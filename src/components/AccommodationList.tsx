// Componente para mostrar lista/grilla de alojamientos

import React, { useState, useEffect } from 'react';
import AccommodationCard from './AccommodationCard';
import type { Accommodation } from '../data/accommodations';
import type { SearchFilters } from './SearchFilters';
import '../styles/AccommodationList.css';

interface AccommodationListProps {
  accommodations: Accommodation[];
  filters?: SearchFilters;
  onAccommodationClick?: (id: number) => void;
  onBookNow?: (id: number) => void;
  itemsPerPage?: number;
}

const AccommodationList: React.FC<AccommodationListProps> = ({
  accommodations,
  filters,
  onAccommodationClick,
  onBookNow,
  itemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>(accommodations);

  // Filtrar alojamientos basado en los filtros
  useEffect(() => {
    let filtered = [...accommodations];

    if (filters) {
      // Filtrar por ubicación
      if (filters.location) {
        filtered = filtered.filter(acc =>
          acc.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          acc.title.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Filtrar por número de huéspedes
      if (filters.guests > 1) {
        filtered = filtered.filter(acc => acc.maxGuests >= filters.guests);
      }

      // Filtrar por tipo
      if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(acc => acc.type === filters.type);
      }

      // Filtrar por rango de precio
      if (filters.priceRange) {
        filtered = filtered.filter(acc =>
          acc.price >= filters.priceRange[0] && acc.price <= filters.priceRange[1]
        );
      }

      // Filtrar por disponibilidad (si hay fechas seleccionadas)
      if (filters.checkIn && filters.checkOut) {
        filtered = filtered.filter(acc => acc.available);
      }
    }

    setFilteredAccommodations(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambien los filtros
  }, [accommodations, filters]);

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccommodations = filteredAccommodations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll hacia arriba cuando cambie de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (filteredAccommodations.length === 0) {
    return (
      <div className="accommodation-list">
        <div className="no-results">
          <div className="no-results-icon">🏠</div>
          <h3>No encontramos alojamientos</h3>
          <p>Intenta modificar los filtros de búsqueda para encontrar más opciones.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="accommodation-list">
      <div className="list-header">
        <h2>
          {filteredAccommodations.length === accommodations.length 
            ? `${accommodations.length} alojamientos disponibles`
            : `${filteredAccommodations.length} de ${accommodations.length} alojamientos`
          }
        </h2>
        <div className="results-info">
          Página {currentPage} de {totalPages}
        </div>
      </div>

      <div className="accommodations-grid">
        {currentAccommodations.map(accommodation => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            onViewDetails={onAccommodationClick}
            onBookNow={onBookNow}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <div className="pagination-numbers">
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                className={`pagination-number ${
                  page === currentPage ? 'active' : ''
                } ${page === '...' ? 'dots' : ''}`}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default AccommodationList;