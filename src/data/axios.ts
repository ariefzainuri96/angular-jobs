import axios from 'axios';
import { environment } from '../../src/environments/environment';
import { UserData } from '../app/login/login.component';

export const axiosInstance = (useAngularPrefix: boolean = true) => {
  const userStorage = localStorage.getItem('user');
  const user: UserData = userStorage ? JSON.parse(userStorage) : null;

  return axios.create({
    baseURL: useAngularPrefix ? environment.apiUrl : environment.baseApiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(user ? { Authorization: `Bearer ${user.token}` } : {}),
    },
  });
};
