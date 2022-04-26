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
    const originalConfig = error.config;

    if (originalConfig.url !== LOGIN_URL && error.response) {
      if (error.response.status === 401 && !originalConfig['_retry']) {
        originalConfig['_retry'] = true;

        try {
          const resp = await instance.post(REFRESH_URL, {
            refreshToken: localStorage.getItem('refresh_token'),
          });

          const { access_token } = resp.data;
          localStorage.setItem('token', JSON.stringify(access_token));
          return instance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
