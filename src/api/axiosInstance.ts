import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If a 401 is received, the token is invalid or expired.
      // We remove the token and redirect to the login page.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // A hard reload is used to reset the application state.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;