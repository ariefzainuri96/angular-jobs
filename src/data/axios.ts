import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ariefzainuri96/angular-jobs',
  timeout: 10000,
});
