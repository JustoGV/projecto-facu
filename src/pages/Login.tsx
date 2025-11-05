// Página de inicio de sesión simple

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Login simple - solo requiere nombre de usuario
    if (username.trim()) {
      localStorage.setItem('usuarioName', username.trim());
      navigate('/');
    } else {
      alert('Por favor ingresa tu nombre');
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Bienvenido</h2>
          <p className="login-subtitle">Ingresa tu nombre para continuar</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">� Nombre</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <button type="submit" className="btn-login">
              Ingresar
            </button>
          </form>
          
          <div className="login-footer">
            <p>¡Es muy fácil! Solo ingresa tu nombre y comienza a explorar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;