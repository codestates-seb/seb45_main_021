import { createSlice } from '@reduxjs/toolkit';
import api from '../../hooks/useAxiosInterceptor';
import Toast from '../../components/toast/Toast';

const initialvalue = {
  isLogin: false,
  userInfo: null,
  likeList: null,
  jwt: { accessToken: null, refreshToken: null },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialvalue,
  reducers: {
    /**
     * @initValue - {isLogin:false,userInfo:null,jwt:{accessToken: null, refreshToken: null}}
     * @acionsDispatch - {...state,...action.payload}
     */
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    /**
     * @dispatch - {isLogin:false,userInfo:null,jwt:{accessToken:null,refreshToken:null}}
     */
    deleteUser: (state) => {
      return { isLogin: false, userInfo: null, jwt: { accessToken: null, refreshToken: null } };
    },
  },
});

export default userSlice.reducer;
export const { updateUser, deleteUser } = userSlice.actions;
