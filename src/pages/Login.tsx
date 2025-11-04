// Página de inicio de sesión

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de login
    if (formData.email && formData.password) {
      localStorage.setItem('usuarioName', formData.email.split('@')[0]);
      navigate('/');
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <p className="login-subtitle">Accede a tu cuenta de HomeSweetHome</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">📧 Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">🔒 Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu contraseña"
                required
              />
            </div>
            
            <button type="submit" className="btn-login">
              Iniciar Sesión
            </button>
          </form>
          
          <div className="login-footer">
            <p>¿No tienes cuenta? <a href="#" onClick={() => alert('Función no disponible')}>Regístrate aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;