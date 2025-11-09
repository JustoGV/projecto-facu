import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Aca iria la lógica para enviar los datos al backend
        console.log('Datos del formulario:', formData);
        // Si el registro es exitoso, redirigiria al login
        navigate('/login');
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="register-container">
      <div className="register-logo" onClick={handleLogoClick}>
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

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
        
        <div className="form-group">
          <label htmlFor="firstName">Nombre:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="register-button">
          Registrarse
        </button>

        <p className="login-link">
          ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Iniciar sesión</span>
        </p>
      </form>
    </div>
  );
};

export default Register;