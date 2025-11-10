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
    const response = await fetch(`${API_BASE_URL}/accommodations`, {
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
    const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
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

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error en el registro');
    }

    return await response.json();
  } catch (error) {
    throw handleApiError(error);
  }
};