import { createSlice } from '@reduxjs/toolkit'

const initialvalue = {};

const userSlice = createSlice({
    name : 'userSlice',
    initialState : initialvalue,
    reducers : {
        addUser : (state, action) => {
            return {...state, ...action.payload}
        },
        deleteUser : (state) => {
            return {};
        }
    }
})


export default userSlice.reducer;
export const {addUser, deleteUser} = userSlice.actions;