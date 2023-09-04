import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsLoading } from '../redux/loading/isLoadingSlice';
import { updateUser, deleteUser } from '../redux/userform/userslice';
import useNav from '../hooks/useNav';

const instance = axios.create({
  baseURL: 'https://5164-14-53-203-58.ngrok-free.app',
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
      dispatch(updateIsLoading(true));
      if (jwt?.accessToken) {
        config.headers['Authorization'] = `Bearer ${jwt.accessToken}`;
      }
      if (jwt?.refreshToken) {
        config.headers['refreshToken'] = `${jwt.refreshToken}`;
      }
      if (userInfo?.memberId) {
        config.headers['memberId'] = `${userInfo.memberId}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
      dispatch(updateIsLoading(false));
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      const { Authorization, refreshToken } = response.headers;
      if (Authorization) {
        dispatch(
          updateUser({ jwt: { accessToken: Authorization, refreshToken: jwt.refreshToken } }),
        );
      }
      if (refreshToken) {
        dispatch(updateUser({ jwt: { accessToken: jwt.accessToken, refreshToken: refreshToken } }));
      }
      dispatch(updateIsLoading(false));
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
      dispatch(updateIsLoading(false));
      return Promise.reject(error);
    },
  );
};

export default instance;
