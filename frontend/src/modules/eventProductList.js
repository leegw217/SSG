import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as mainPageAPI from '../lib/api/mainPage';

export const fetchPlusOneProductList = createAsyncThunk(
  'eventProducts/fetchPlusOneProductList',
  async () => {
    const response = await mainPageAPI.readPlusOneProductList();
    return response.data;
  },
);
export const fetchSaleProductList = createAsyncThunk(
  'eventProducts/fetchSaleProductList',
  async () => {
    const response = await mainPageAPI.readSaleProductList();
    return response.data;
  },
);
export const fetchFreeGiftProductList = createAsyncThunk(
  'eventProducts/fetchFreeGiftProductList',
  async () => {
    const response = await mainPageAPI.readFreeGiftProductList();
    return response.data;
  },
);

const eventProductListSlice = createSlice({
  name: 'eventProductList',
  initialState: {
    loading: false,
    hasErrors: false,
    plusOneList: null,
    saleList: null,
    freeGiftList: null,
  },
  reducers: {
    saveEventDetail: (state, {payload}) => {
      state.eventDetailImg = payload;
    },
  },
  extraReducers: {
    [fetchPlusOneProductList.pending]: state => {
      state.loading = true;
    },
    [fetchPlusOneProductList.fulfilled]: (state, {payload}) => {
      state.plusOneList = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchPlusOneProductList.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    [fetchSaleProductList.pending]: state => {
      state.loading = true;
    },
    [fetchSaleProductList.fulfilled]: (state, {payload}) => {
      state.saleList = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchSaleProductList.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    [fetchFreeGiftProductList.pending]: state => {
      state.loading = true;
    },
    [fetchFreeGiftProductList.fulfilled]: (state, {payload}) => {
      state.freeGiftList = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchFreeGiftProductList.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {saveEventDetail} = eventProductListSlice.actions;
export default eventProductListSlice.reducer;
