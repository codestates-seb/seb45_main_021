import { createSlice } from '@reduxjs/toolkit';

const initialvalue = {
  isLogin: false,
  userInfo: null,
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
    deleteUser: () => {
      return { isLogin: false, userInfo: null, jwt: { accessToken: null, refreshToken: null } };
    },
  },
});

export default userSlice.reducer;
export const { updateUser, deleteUser } = userSlice.actions;
