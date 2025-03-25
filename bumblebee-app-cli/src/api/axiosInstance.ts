import axios from 'axios';

// Create an axios instance to set base URL and common headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;