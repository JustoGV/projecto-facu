// Página de inicio de sesión conectada al backend

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Bienvenido</h2>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
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
            
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>¡Es muy fácil! Ingresa tus credenciales y comienza a explorar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;