import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userForm/userSlice';
import useNav from '../hooks/useNav';

const instance = axios.create({
  baseURL: 'http://ec2-52-78-224-100.ap-northeast-2.compute.amazonaws.com:8080/',
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user.jwt);
  const { toAbout, toSignin } = useNav();

  instance.interceptors.request.use(
    (config) => {
      const newHeaders = { ...config.headers };
      if (jwt?.accesstoken) {
        newHeaders['accesstoken'] = `${jwt.accesstoken}`;
      } else {
        delete newHeaders['accesstoken'];
      }
      if (jwt?.refreshtoken) {
        newHeaders['refreshtoken'] = `${jwt.refreshtoken}`;
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
      const { accesstoken, refreshtoken } = response.headers;
      if (accesstoken && refreshtoken) {
        dispatch(updateUser({ jwt: { accesstoken: accesstoken, refreshtoken: refreshtoken } }));
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
