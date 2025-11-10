//pagina Register para crear usuario desde login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, handleApiError } from '../services/api';
import '../styles/Register.css';

/**
 * Interfaz que define la estructura de los datos del formulario.
 * Cada campo corresponde a un input del formulario de registro.
 */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Interfaz que define los posibles errores del formulario
 * te da un error en el campo que falte o no cumpla con lo que pedimos
 */
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string; // Error general en el envio del formulario
}

/**
 * Componente funcional principal que gestiona el formulario de registro
 */
const Register: React.FC = () => {
  // Hook de React Router para redirigir a otras rutas
  const navigate = useNavigate();

  // Estado que almacena los valores actuales del formulario
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Estado para manejar los mensajes de error por campo
  const [errors, setErrors] = useState<FormErrors>({});

  // Estado para mostrar un indicador de carga (loading) durante el envío
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Funcion de validación de formulario
   * Comprueba que todos los campos sean validos antes de enviar la info al back
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmacinn de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Guardar errores detectados en el estado
    setErrors(newErrors);

    // Retornar true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Funcion que maneja el envio del formulario
   * Primero valida y dsp intenta registrar al usuario mediante el back
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la pagina al enviar el formulario
    
    // Si la validacion pasa
    if (validateForm()) {
      setIsLoading(true); // Mostrar indicador de carga
      try {
        // Excluir confirmPassword antes de enviar los datos
        const { confirmPassword, ...registerData } = formData;

        // Llamada al servicio de registro (API)
        await registerUser(registerData);

        console.log('Registro exitoso');

        // Redirigir al usuario a la pantalla de login
        navigate('/login');
      } catch (error) {
        console.error('Error al registrar:', error);

        // Mostrar mensaje de error general
        setErrors(prev => ({
          ...prev,
          submit: 'Error al registrar usuario. Por favor intente nuevamente.'
        }));
      } finally {
        setIsLoading(false); // Ocultar indicador de carga
      }
    }
  };

  /**
   * Funcion que actualiza el estado del formulario cada vez que cambia un input
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizamos el campo correspondiente sin perder los demas
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Funcion que maneja el clic sobre el logo superior
   * Redirige al usuario a la página principal
   */
  const handleLogoClick = () => {
    const isAuthenticated = localStorage.getItem("usuarioName");
    if (isAuthenticated) {
      navigate('/'); // Redirige al home si esta autenticado bien
    } else {
      navigate('/'); // Tambien redirige al home (puede adaptarse segun el flujo)
    }
  };

  return (
    <div className="register-container">
      {/* Logo de la aplicación: clicable para volver al inicio */}
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

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
        
        {/* Error general al enviar el formulario */}
        {errors.submit && <div className="error-message general-error">{errors.submit}</div>}
        
        {/* Campo: Nombre */}
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

        {/* Campo: Apellido */}
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

        {/* Campo: Email */}
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

        {/* Campo: Contraseña */}
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

        {/* Campo: Confirmar contraseña */}
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

        {/* Botón de envío: deshabilitado mientras se procesa */}
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Enlace para ir a la pantalla de inicio de sesión */}
        <p className="login-link">
          ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Iniciar sesión</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
