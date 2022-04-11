import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));
  config.headers.Authorization = token
    ? `${token.token_type} ${token.access_token}`
    : '';
  return config;
});

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    // ToDo Token Refresh
    console.log('401, implement token refresh here?');

  }
  return Promise.reject(error)
});

export default instance;
