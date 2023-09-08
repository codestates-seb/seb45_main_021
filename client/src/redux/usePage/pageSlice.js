import { createSlice } from '@reduxjs/toolkit';

const initialvalue = {
  pageNum: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: initialvalue,
  reducers: {
    clearPage: () => {
      return { pageNum: 1 };
    },

    updatePage: (state, action) => {
      return { pageNum: action.payload };
    },
  },
});

export default pageSlice.reducer;
export const { clearPage, updatePage } = pageSlice.actions;
