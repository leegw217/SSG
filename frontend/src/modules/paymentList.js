import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as paymentListAPI from '../lib/api/paymentList';

export const fetchPaymentList = createAsyncThunk(
  'payment/fetchPaymentList',
  async (formData, {getState}) => {
    const {userInfo} = getState();
    const response = await paymentListAPI.readItems({
      ...formData,
      memberId: userInfo.memberId,
    });
    return response.data;
  },
);
const paymentListSlice = createSlice({
  name: 'paymentList',
  initialState: {
    loading: false,
    hasErrors: false,
    paymentList: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPaymentList.pending]: state => {
      state.loading = true;
    },
    [fetchPaymentList.fulfilled]: (state, {payload}) => {
      state.paymentList = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchPaymentList.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default paymentListSlice.reducer;
