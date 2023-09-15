import { createSlice } from '@reduxjs/toolkit';
import api from '../../hooks/useAxiosInterceptor';

const initialValue = {
  isLogin: false,
  userInfo: null,
  likeList: { projectList: [], portfolioList: [] },
  jwt: { accessToken: null, refreshToken: null },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
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
      if (state.userInfo?.memberId) {
        api.post(`/members/logout/${state.userInfo.memberId}`).catch((error) => console.log(error));
      }
      return {
        isLogin: false,
        userInfo: null,
        likeList: { projectList: [], portfolioList: [] },
        jwt: { accessToken: null, refreshToken: null },
      };
    },

    heartListUpdate: (state, action) => {
      return { ...state, likeList: { ...action.payload } };
    },
  },
});

export default userSlice.reducer;
export const { updateUser, deleteUser, heartListUpdate } = userSlice.actions;
