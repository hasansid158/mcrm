import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = cookies.get('token');

    config.headers.Authorization = `Bearer ${token || ''}`;
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.baseURL = 'https://mastercrm.io/';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};