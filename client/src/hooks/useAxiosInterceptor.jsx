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
  const userInfo = useSelector((state) => state.user.userInfo);
  const { toAbout, toSignin } = useNav();
  console.log(jwt);
  instance.interceptors.request.use(
    (config) => {
      const newHeaders = { ...config.headers };
      if (jwt?.accesstoken) {
        newHeaders['accesstoken'] = `Bearer ${jwt.accesstoken}`;
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
        try {
          instance.post(`/members/logout/${userInfo.memberId}`);
        } catch (error) {
          console.log(error);
        }
        alert('토큰이 잘못 전달되었습니다.');
        toSignin();
      }

      if (message === 'refreshToken has expired') {
        dispatch(deleteUser());
        try {
          instance.post(`/members/logout/${userInfo.memberId}`);
        } catch (error) {
          console.log(error);
        }
        alert('세션이 만료되었습니다.');
        toSignin();
      }

      if (message === 'refreshToken has different') {
        dispatch(deleteUser());
        try {
          instance.post(`/members/logout/${userInfo.memberId}`);
        } catch (error) {
          console.log(error);
        }
        alert('새 기기에서 접속하여 로그하웃 되었습니다.');
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
