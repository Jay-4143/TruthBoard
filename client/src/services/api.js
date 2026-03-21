import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    
    const getSafeToken = (key) => {
      try {
        const info = localStorage.getItem(key);
        if (info && info !== 'undefined' && info !== 'null') {
          const parsed = JSON.parse(info);
          return parsed ? parsed.token : null;
        }
      } catch (err) {
        console.error(`Error parsing ${key} from localStorage`, err);
      }
      return null;
    };

    const bToken = getSafeToken('businessInfo');
    const uToken = getSafeToken('userInfo');

    // Determine which token to use
    if (config.url.includes('/business')) {
      token = bToken || uToken;
    } else {
      // For shared or user routes
      token = uToken || bToken;
    }

    if (token) {
      // console.log(`Sending token for ${config.url}`);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we get a 401, check which token was used and clear it
      // This prevents logging out the 'wrong' type if one is still valid
      const authHeader = error.config.headers.Authorization;
      if (authHeader) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('businessInfo');
        // window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
