import axios from 'axios';
import { environment } from '../../src/environments/environment';

export const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
