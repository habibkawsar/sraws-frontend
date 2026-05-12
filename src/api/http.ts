import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5088/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sraws_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail ?? error.response?.data?.title ?? error.message;
  }
  return 'Unexpected error. Please try again.';
};
