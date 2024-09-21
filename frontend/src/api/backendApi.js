import axios from 'axios';
import { isRefreshTokenRequest, refreshAccessToken } from './refreshToken';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

instance.interceptors.response.use(
  (response) => response,
  async(error) => {
    if (error.response.status === 401 
      && !isRefreshTokenRequest(error.config) 
      && !error.config.isRetryRequest 
      && error.config.headers.Authorization) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        await refreshAccessToken(refreshToken);
        const newToken = localStorage.getItem('token');
        error.config.headers.Authorization = `Bearer ${newToken}`;
        error.config.isRetryRequest = true;
        return instance(error.config);
      } catch (refreshError) {
        console.error('Error while refreshing token:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;