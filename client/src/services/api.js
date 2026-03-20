import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    
    // If it's a business route, try to get business token
    if (config.url.includes('/business')) {
      const businessInfo = localStorage.getItem('businessInfo');
      if (businessInfo) {
        token = JSON.parse(businessInfo).token;
      }
    }

    // Fallback to regular user token if no business token or not a business route
    if (!token) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        token = JSON.parse(userInfo).token;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-logout on 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.config.url.includes('/business')) {
        localStorage.removeItem('businessInfo');
      } else {
        localStorage.removeItem('userInfo');
      }
      // window.location.reload(); // Optional: might be too aggressive
    }
    return Promise.reject(error);
  }
);

export default api;
