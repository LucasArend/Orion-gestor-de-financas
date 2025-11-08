import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useApiClient = () => {
  const { token } = useAuth();

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};
