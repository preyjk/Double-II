import axios from 'axios';

export default function request(config) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    timeout: 5000,
  });
  return instance(config);
};
