import { createSlice } from '@reduxjs/toolkit';

const initalValue = {
  language: 'all',
  sortOption: 'latest',
  isEmploy: false,
};

const filterOptionSlice = createSlice({
  name: 'filterOption',
  initialState: initalValue,
  reducers: {
    updateOption: (state, action) => {
      return { ...state, ...action.payload };
    },

    clearOption: () => {
      return initalValue;
    },
  },
});

export default filterOptionSlice.reducer;
export const { updateOption, clearOption } = filterOptionSlice.actions;
