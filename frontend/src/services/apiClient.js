import axios from 'axios';
import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from '../utils/storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    return Promise.reject({
      ...error,
      message,
      status: error.response?.status,
    });
  },
);

export default apiClient;
