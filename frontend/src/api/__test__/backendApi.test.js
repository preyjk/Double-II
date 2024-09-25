import axios from '../backendApi';
import * as refreshTokenModule from '../refreshToken';
import { describe, it, expect, afterEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';

describe('test auto refresh token', () => {

  let mock;

  beforeEach(() => {
    // Set up Axios Mock Adapter
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // Reset localStorage
    localStorage.clear();
    // Restore the original Axios instance
    mock.restore();
  });

  it('should refresh token', async () => {
    const refreshToken = 'refreshToken';
    const token = 'token';
    const newToken = 'new token';
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('token', JSON.stringify(token));

    // Mock the GET /test endpoint to return a 401 error
    mock.onGet('/test').reply(() => {
      return [401, { message: 'Unauthorised' }];
    });

    // Mock the axios post request
    mock.onPost('/public/auth/refresh-token').reply(async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Add 1 second delay
      return [200, { token: newToken }];
    });


    const refreshAccessTokenSpy = vi.spyOn(refreshTokenModule, 'refreshAccessToken');
    const postSpy = vi.spyOn(axios, 'post');

    await expect(async () => {
      await Promise.all([
        axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
    }).rejects.toThrow('Request failed with status code 401');

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(3);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem('token'))).toEqual(newToken);
  });

  it('should refresh token and the new token should work', async () => {
    const refreshToken = 'refreshToken';
    const token = 'token';
    const newToken = 'new token';
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('token', JSON.stringify(token));

    const mock = new MockAdapter(axios);

    // Mock the GET /test endpoint to return a 401 error
    mock.onGet('/test').reply((config) => {
      if (config.headers.Authorization === `Bearer ${newToken}`) {
        return [200, { message: 'Success' }];
      }
      return [401, { message: 'Unauthorised' }];
    });

    // Mock the axios post request
    mock.onPost('/public/auth/refresh-token').reply(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [200, { token: newToken }];
    });

    const refreshAccessTokenSpy = vi.spyOn(refreshTokenModule, 'refreshAccessToken');
    const postSpy = vi.spyOn(axios, 'post');

    const responses = await Promise.all([
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(3);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem('token'))).toEqual(newToken);
  });

  it('should not refresh token if refresh token is not available', async () => {
    const token = 'token';
    localStorage.setItem('token', JSON.stringify(token));

    // Mock the GET /test endpoint to return a 401 error
    mock.onGet('/test').reply(() => {
      return [401, { message: 'Unauthorised' }];
    });

    const refreshAccessTokenSpy = vi.spyOn(refreshTokenModule, 'refreshAccessToken');
    const postSpy = vi.spyOn(axios, 'post');

    await expect(async () => {
      await axios.get('/test', { headers: { Authorization: `Bearer ${token}` } });
    }).rejects.toThrow('Request failed with status code 401');

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(0);
    expect(postSpy).toHaveBeenCalledTimes(0);
    expect(JSON.parse(localStorage.getItem('token'))).toEqual(token);
  });

  it('should not refresh token if there is no Authorization header', async () => {
    const refreshToken = 'refreshToken';
    const token = 'token';
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('token', JSON.stringify(token));

    // Mock the GET /test endpoint to return a 401 error
    mock.onGet('/test').reply(() => {
      return [401, { message: 'Unauthorised' }];
    });
    const refreshAccessTokenSpy = vi.spyOn(refreshTokenModule, 'refreshAccessToken');
    const postSpy = vi.spyOn(axios, 'post');

    await expect(async () => {
      await axios.get('/test');
    }).rejects.toThrow('Request failed with status code 401');

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(0);
    expect(postSpy).toHaveBeenCalledTimes(0);
    expect(JSON.parse(localStorage.getItem('token'))).toEqual(token);
  });

  it('should error if refresh token fails', async () => {
    const refreshToken = 'refreshToken';
    const token = 'token';
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('token', JSON.stringify(token));

    // Mock the GET /test endpoint to return a 401 error
    mock.onGet('/test').reply(401, { message: 'Unauthorised' });

    // Mock the axios post request
    mock.onPost('/public/auth/refresh-token').reply(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [401, { message: 'Refresh token failed' }];
    });

    const refreshAccessTokenSpy = vi.spyOn(refreshTokenModule, 'refreshAccessToken');
    const postSpy = vi.spyOn(axios, 'post');

    await expect(Promise.all([
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get('/test', { headers: { Authorization: `Bearer ${token}` } }),
    ])).rejects.toThrow('Request failed with status code 401');

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(3);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem('token'))).toEqual(token);
  });

});