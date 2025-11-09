// Página principal de la aplicación de reservas de alojamientos

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchFiltersComponent, { type SearchFilters } from '../components/SearchFilters';
import AccommodationList from '../components/AccommodationList';
import { getAllAccommodations, handleApiError } from '../services/api';
import '../styles/Home.css';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState<BackendAccommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 150000],
    type: 'all'
  });

  // Cargar alojamientos del backend
  useEffect(() => {
    const loadAccommodations = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getAllAccommodations();
        setAccommodations(data);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error loading accommodations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAccommodations();
  }, []);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleAccommodationClick = (id: number) => {
    navigate(`/info/${id}`);
  };


  const handleBookNow = (id: number) => {
    const isAuthenticated = localStorage.getItem("usuarioName");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
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

          {/* Estados de loading y error */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando alojamientos...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-message">
                <h3>Error al cargar alojamientos</h3>
                <p>{error}</p>
                <button 
                  className="retry-button"
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {/* Lista de alojamientos */}
          {!loading && !error && (
            <AccommodationList
              accommodations={accommodations}
              filters={filters}
              onAccommodationClick={handleAccommodationClick}
              onBookNow={handleBookNow}
              itemsPerPage={6}
            />
          )}
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
