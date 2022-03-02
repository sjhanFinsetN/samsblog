import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
});
// const axiosLogin = axios.create({
//   baseURL: 'http://localhost:3001/auth/login'
// });


// export const axiosPosts = axios.create({
//   baseURL: 'http://localhost:3001/blog/posts'
// });

// axiosLogin.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

// axiosPosts.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
// );

export default axiosInstance ;
