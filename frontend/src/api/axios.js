import axios from 'axios';
import { refresh } from '../store/auth/auth-actions';

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const prevRequest = error?.config;
    console.log(prevRequest);
    if (error.response.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      refresh();
      const token = JSON.parse(localStorage.getItem('token'));
      prevRequest.headers.Authorization = `${token.token_type} ${token.access_token}`;
      axios(prevRequest);
    }
    return error;
  },
);

export default instance;
