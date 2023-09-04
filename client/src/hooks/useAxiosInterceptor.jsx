import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userform/userslice';
import useNav from '../hooks/useNav';

const instance = axios.create({
  baseURL: 'https://5073-14-53-203-58.ngrok-free.app',
  timeout: 7000,
  headers: { 'Content-Type': 'application/json', withCredentials: true },
});

export const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
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
      if (userInfo?.memberId) {
        config.headers['memberId'] = `${userInfo.memberId}`;
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
      let msg;
      if (error.response.data.message) {
        msg = error.response.data.message;
      }

      if (msg && msg === 'refreshToken has expired') {
        dispatch(deleteUser());
        window.alert('토큰이 만료되어 자동으로 로그아웃 되었습니다.');
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
