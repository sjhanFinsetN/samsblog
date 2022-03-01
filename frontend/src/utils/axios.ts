import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInst = axios.create({
  baseURL: 'http://localhost:3001'
});

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
