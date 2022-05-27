/* eslint-disable camelcase */
/* eslint-disable dot-notation */
import axios from 'axios';
import { LOGIN_URL, REFRESH_URL } from '../constants/apiUrls';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers.Authorization = token
        ? `${token.token_type} ${token.access_token}`
        : '';
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response.status === 401 && error.response && refreshToken) {
      const resp = await instance.post(REFRESH_URL, {
        refreshToken,
      });

      const { access_token } = resp.data;
      localStorage.setItem('token', JSON.stringify(access_token));

      return () =>
        instance
          .post(REFRESH_URL, {
            refreshToken,
          })
          .then((result) => {
            const { access_token } = result.data;
            localStorage.setItem('token', JSON.stringify(access_token));
            localStorage.setItem('refresh_token', refreshToken);
          })
          .catch((error) => {
            const originalconfig = error.config;
            if (originalconfig.url !== LOGIN_URL) {
              localStorage.removeItem('token');
              localStorage.removeItem('refresh_token');
            }
            if (error) return Promise.reject(error);
            return null;
          });
    }
    return Promise.reject(error);
  },
);

export default instance;
