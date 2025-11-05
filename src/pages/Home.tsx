
// Página principal de la aplicación de reservas de alojamientos

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchFiltersComponent, { type SearchFilters } from '../components/SearchFilters';
import AccommodationList from '../components/AccommodationList';
import { mockAccommodations } from '../data/accommodations';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 150000],
    type: 'all'
  });

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleAccommodationClick = (id: number) => {
    navigate(`/info/${id}`);
  };

  const handleBookNow = (id: number) => {
    navigate(`/info/${id}`);
  };

  return (
    <div className="home-page">
      <header>
        <Navbar />
      </header>

      <main className="home-main">
        {/* Hero Section */}
        {/* <Hero /> */}

        {/* Container principal */}
        <div className="home-container">
          {/* Filtros de búsqueda */}
          <SearchFiltersComponent 
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />

          {/* Lista de alojamientos */}
          <AccommodationList
            accommodations={mockAccommodations}
            filters={filters}
            onAccommodationClick={handleAccommodationClick}
            onBookNow={handleBookNow}
            itemsPerPage={6}
          />
        </div>
      </main>

      <footer className="home-footer">
        <div className="footer-content">
          <p>&copy; 2025 HomeSweetHome. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
