import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  lang: 'all',
  sort: 'latest',
  employ: false,
  keyword: '',
  searchType: 'project',
};

const filterOptionSlice = createSlice({
  name: 'filterOption',
  initialState: initialValue,
  reducers: {
    updateOption: (_, action) => {
      return action.payload;
    },
  },
});

export default filterOptionSlice.reducer;
export const { updateOption } = filterOptionSlice.actions;
