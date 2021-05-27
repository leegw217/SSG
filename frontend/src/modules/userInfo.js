import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as authAPI from '../lib/api/auth';
import * as asyncStorage from '../AsyncStorage/asyncStorage';

export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async loginInfo => {
    let response = await authAPI.LoginWithPassword(loginInfo);
    await asyncStorage.storeData('token', response.headers.authorization);
    await asyncStorage.storeObjectData('user', response.data);
    return response;
  },
);

export const fetchUserInfoWithToken = createAsyncThunk(
  'userInfo/fetchUserInfoWithToken',
  async token => {
    let response = await authAPI.getUserInfo(token);
    return response;
  },
);

export const fetchUserInfoWithAsyncStorage = createAsyncThunk(
  'userInfo/fetchUserInfoWithAsyncStorage',
  async ({userData}) => {
    return userData;
  },
);

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    loading: false,
    hasErrors: false,
    memberId: 0,
    loginId: '',
    nickname: '',
    birth: '',
    phone: '',
  },
  extraReducers: {
    // 일반 로그인
    [fetchUserInfo.pending]: state => {
      state.loading = true;
    },
    [fetchUserInfo.fulfilled]: (state, {payload}) => {
      // 유저 정보 저장
      state.memberId = Number(payload.data.id);
      state.loginId = payload.data.loginId;
      state.nickname = payload.data.nickname;
      state.birth = payload.data.birth;
      state.phone = payload.data.phone;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchUserInfo.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },

    // token 기반 로그인
    [fetchUserInfoWithToken.pending]: state => {
      state.loading = true;
    },
    [fetchUserInfoWithToken.fulfilled]: (state, {payload}) => {
      state.memberId = Number(payload.data.id);
      state.loginId = payload.data.loginId;
      state.nickname = payload.data.nickname;
      state.birth = payload.data.birth;
      state.phone = payload.data.phone;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchUserInfoWithToken.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    // AsyncStorage 유저 정보 이행
    [fetchUserInfoWithAsyncStorage.pending]: state => {
      state.loading = true;
    },
    [fetchUserInfoWithAsyncStorage.fulfilled]: (state, {payload}) => {
      state.memberId = Number(payload.id);
      state.loginId = payload.loginId;
      state.nickname = payload.nickname;
      state.birth = payload.birth;
      state.phone = payload.phone;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchUserInfoWithAsyncStorage.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default userSlice.reducer;
