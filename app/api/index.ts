import axios from 'axios';
import type { ExampleResponse, LoginRequest, LoginResponse } from '../types';

let authToken: string | null = null;

// Create an axios instance
export const api = axios.create({
  baseURL: 'https://your-api-base-url.com', // Change to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the auth token for future requests
export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Example GET API call function
export const fetchExample = async (): Promise<ExampleResponse> => {
  try {
    const response = await api.get('/example');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Example POST API call function (e.g., login)
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Example: Invalidate queries after mutation
// import { useQueryClient } from '@tanstack/react-query';
// const queryClient = useQueryClient();
// queryClient.invalidateQueries({ queryKey: ['example'] });

// To add more endpoints, export more functions here
// Example:
// export const fetchUser = async (id: string) => {
//   const response = await api.get(`/users/${id}`);
//   return response.data;
// }; 