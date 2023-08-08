import axios from 'axios';
import { VITE_API_URL } from '@/env';

export const $api = axios.create({
  baseURL: VITE_API_URL,
  timeout: import.meta.env.DEV ? 20000 : 60000,
});
