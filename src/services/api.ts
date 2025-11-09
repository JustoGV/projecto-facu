// Servicio de API para conectar con el backend

const API_BASE_URL = 'http://localhost:8080/api';

// Configuración base para fetch
const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Obtener todos los alojamientos
export const getAllAccommodations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/accomodations`, {
      method: 'GET',
      ...apiConfig,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    throw error;
  }
};

// Obtener alojamiento por ID
export const getAccommodationById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accomodations/${id}`, {
      method: 'GET',
      ...apiConfig,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching accommodation ${id}:`, error);
    throw error;
  }
};

interface LoginResponse {
  firstName?: string;
  token?: string;
  id?: string;
}

// Login de usuario
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      ...apiConfig,
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return 'Error al conectar con el servidor';
};