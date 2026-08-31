import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('onewinq_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;

async function refreshTokens() {
  const refreshToken = localStorage.getItem('onewinq_refresh_token');
  if (!refreshToken) throw new Error('No refresh token');
  const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
  const tokens = response.data?.data || response.data;
  if (!tokens?.accessToken) throw new Error('Invalid refresh response');
  localStorage.setItem('onewinq_access_token', tokens.accessToken);
  localStorage.setItem('onewinq_refresh_token', tokens.refreshToken);
  return tokens.accessToken;
}

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const isAuthRoute = typeof original?.url === 'string' && original.url.startsWith('/auth/');
    if (status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;
      try {
        refreshPromise = refreshPromise || refreshTokens();
        const accessToken = await refreshPromise;
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem('onewinq_access_token');
        localStorage.removeItem('onewinq_refresh_token');
      } finally {
        refreshPromise = null;
      }
    }
    return Promise.reject(error.response?.data || { message: 'Unable to reach the server.' });
  }
);

export default api;
