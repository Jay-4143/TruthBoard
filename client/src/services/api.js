import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api',
});

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-logout on 401 responses (expired token, deleted user, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        localStorage.removeItem('userInfo');
        window.location.reload(); // Force fresh state
      }
    }
    return Promise.reject(error);
  }
);

export default api;
