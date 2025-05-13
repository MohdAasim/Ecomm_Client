import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Update this to match your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;
