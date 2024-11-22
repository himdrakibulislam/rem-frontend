import axios from 'axios';

// Determine the base URL based on the environment
// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.REACT_APP_API_URL 
//     : ''; 
const baseURL = process.env.REACT_APP_API_URL; 
// Create an instance of Axios with default settings
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

// Optional: Add request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response
    return response;
  },
  (error) => {
    // Handle the error response
    return Promise.reject(error);
  }
);

export default axiosInstance;
