export const APP_NAME = import.meta.env.VITE_APP_NAME || 'React Frontend';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_REGISTER_OTP: '/verify-register-otp',
  VERIFY_LOGIN_OTP: '/verify-login-otp',
  DASHBOARD: '/dashboard',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
};
