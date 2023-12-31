import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userForm/userSlice';
import useNav from '../hooks/useNav';

let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://ec2-52-78-224-100.ap-northeast-2.compute.amazonaws.com:8080/';
} else {
  baseURL = 'https://sebspec.site';
}

const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const { toAbout, toSignin } = useNav();

  instance.interceptors.request.use(
    (config) => {
      const localData = JSON.parse(localStorage.getItem('persist:root'));
      const { accesstoken, refreshtoken } = JSON.parse(localData.user).jwt;
      const newHeaders = { ...config.headers };
      if (accesstoken) {
        newHeaders['accesstoken'] = accesstoken;
      } else {
        delete newHeaders['accesstoken'];
      }
      if (refreshtoken) {
        newHeaders['refreshtoken'] = refreshtoken;
      } else {
        delete newHeaders['refreshtoken'];
      }
      config.headers = newHeaders;
      return config;
    },
    (error) => {
      throw error;
    },
  );

  instance.interceptors.response.use(
    (response) => {
      const localData = JSON.parse(localStorage.getItem('persist:root'));
      const jwt = JSON.parse(localData.user).jwt;
      const { accesstoken, refreshtoken } = response.headers;
      if (accesstoken && refreshtoken) {
        dispatch(updateUser({ jwt: { accesstoken: accesstoken, refreshtoken: refreshtoken } }));
      } else if (accesstoken) {
        dispatch(updateUser({ jwt: { ...jwt, accesstoken: accesstoken } }));
      }
      return response;
    },
    (error) => {
      let message;
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }

      if (message === 'Bad Token') {
        dispatch(deleteUser());
        toSignin();
      }

      if (message === 'refreshToken has expired') {
        dispatch(deleteUser());
        toSignin();
      }

      if (message === 'refreshToken has different') {
        dispatch(deleteUser());
        toSignin();
      }

      if (error.code === 'ECONNABORTED') {
        toAbout();
      }
      throw error;
    },
  );
};

export default instance;
