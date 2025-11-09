// Página de inicio de sesión conectada al backend

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, handleApiError } from '../services/api';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData.email, formData.password);
      
      // Guardar información del usuario en localStorage
      localStorage.setItem('usuarioName', response.firstName || formData.email.split('@')[0]);
      localStorage.setItem('userToken', response.token || 'authenticated');
      localStorage.setItem('userId', response.id || '1');
      
      // Navegar a home
      navigate('/');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    const isAuthenticated = localStorage.getItem("usuarioName");
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo" onClick={handleLogoClick}>
        <svg
          className="logoIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="var(--primary)"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z" />
        </svg>
        <h1>HomeSweetHome</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">📧 Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">🔒 Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Tu contraseña"
            required
          />
        </div>
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className="register-link">
          ¿No tienes una cuenta? {' '}
          <span onClick={() => navigate('/register')}>
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;