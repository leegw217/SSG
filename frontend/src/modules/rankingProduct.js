import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as mainPageAPI from '../lib/api/mainPage';

export const fetchBeerRanking = createAsyncThunk(
  'ranking/fetchBeerRanking',
  async () => {
    const response = await mainPageAPI.readBeerRanking();
    return response.data;
  },
);
export const fetchIcecreamRanking = createAsyncThunk(
  'ranking/fetchIcecreamRanking',
  async () => {
    const response = await mainPageAPI.readIcecreamRanking();
    return response.data;
  },
);
export const fetchSnackRanking = createAsyncThunk(
  'ranking/fetchSnackRanking',
  async () => {
    const response = await mainPageAPI.readSnackRanking();
    return response.data;
  },
);
const rankingProductSlice = createSlice({
  name: 'rankingProduct',
  initialState: {
    loading: false,
    hasErrors: false,
    beer: null,
    icecream: null,
    snack: null,
  },
  reducers: {},
  extraReducers: {
    [fetchBeerRanking.pending]: state => {
      state.loading = true;
    },
    [fetchBeerRanking.fulfilled]: (state, {payload}) => {
      state.beer = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchBeerRanking.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    [fetchIcecreamRanking.pending]: state => {
      state.loading = true;
    },
    [fetchIcecreamRanking.fulfilled]: (state, {payload}) => {
      state.icecream = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchIcecreamRanking.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    [fetchSnackRanking.pending]: state => {
      state.loading = true;
    },
    [fetchSnackRanking.fulfilled]: (state, {payload}) => {
      state.snack = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchSnackRanking.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default rankingProductSlice.reducer;
