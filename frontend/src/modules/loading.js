import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {},
  reducers: {
    startLoading: (state, action) => ({...state, [action.payload]: true}),
    finishLoading: (state, action) => ({...state, [action.payload]: false}),
  },
});

export const {startLoading, finishLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
