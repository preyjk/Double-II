import axios from './backendApi';

let promise;
export function refreshAccessToken(refreshToken) {
  if (promise) {
    return promise;
  }
  promise = axios.post('/public/auth/refresh-token', {
    refreshToken,
  }, {
    isRefreshToken: true,
  }).then((response) => {
    localStorage.setItem('token', response.data.token);
  }).finally(() => {
    promise = null;
  });
  return promise;
}

export function isRefreshTokenRequest(config) {
  return config.isRefreshToken;
}