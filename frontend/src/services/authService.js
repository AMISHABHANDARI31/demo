import apiClient from './apiClient';

export const authService = {
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },
  async verifyRegisterOtp(payload) {
    const { data } = await apiClient.post('/auth/verify-register-otp', payload);
    return data;
  },
  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },
  async verifyLoginOtp(payload) {
    const { data } = await apiClient.post('/auth/verify-login-otp', payload);
    return data;
  },
  async getProfile() {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },
};
