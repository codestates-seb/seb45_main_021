import { createSlice } from '@reduxjs/toolkit';

const initialvalue = {
  value: false,
};

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: initialvalue,
  reducers: {
    /**
     * @initValue - {value:false}
     * @actionDispatch - {value:action.payload}
     */
    updateIsLoading: (action) => {
      return { value: action.payload };
    },
  },
});

export default isLoadingSlice.reducer;
export const { updateIsLoading } = isLoadingSlice.actions;
