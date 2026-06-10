import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from './storage';

export const tokenStorage = {
  getToken() {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN);
  },
  setToken(token) {
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },
  removeToken() {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },
  getUser() {
    return storage.get(STORAGE_KEYS.AUTH_USER);
  },
  setUser(user) {
    storage.set(STORAGE_KEYS.AUTH_USER, user);
  },
  removeUser() {
    storage.remove(STORAGE_KEYS.AUTH_USER);
  },
  clearAuth() {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.AUTH_USER);
  },
};
