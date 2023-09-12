import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userform/userSlice';
import useNav from '../hooks/useNav';
import Toast from '../components/toast/Toast';

const instance = axios.create({
  baseURL: 'http://ec2-52-78-224-100.ap-northeast-2.compute.amazonaws.com/',
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
      if (jwt?.accesstoken) {
        config.headers['accesstoken'] = `Bearer ${jwt.accesstoken}`;
      }
      if (jwt?.refreshtoken) {
        config.headers['refreshtoken'] = `${jwt.refreshtoken}`;
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
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
      console.log(error);
      let message;
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }

      if (message === 'refreshToken has expired') {
        dispatch(deleteUser());
        Toast.warning('세션이 만료되었습니다.');
        toSignin();
      }

      if (error.code === 'ECONNABORTED') {
        console.log('요청 시간 초과');
        toAbout();
      }
      return Promise.reject(error);
    },
  );
};

export default instance;
