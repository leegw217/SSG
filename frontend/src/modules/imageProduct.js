import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as imageAPI from '../lib/api/image';

export const fetchBarcode = createAsyncThunk(
  'imageProduct/fetchBarcode',
  async uri => {
    let formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'picture.jpg',
      type: 'image/jpg',
    });

    const response = await imageAPI.getBarcode(formData);

    let t = response.data;

    let value = t.Prediction_probability;
    let product = t.class_name;

    let result = null;

    if (value >= 0.99) {
      switch (product) {
        case '001.vita':
          result = '8806002001845';
          break;
        case '002.lemonwater':
          result = '8801056042134';
          break;
        case '003.coke':
          result = '8801094017606';
          break;
        case '004.toreta':
          result = '8801094412005';
          break;
        case '005.bakasf':
          result = '8804381000343';
          break;
        case '006.hwal':
          result = '8806016310018';
          break;
        case '007.pear':
          result = '8801105000535';
          break;
      }
    } else {
      result = 'none';
    }
    return result;
  },
);

const imageProductSlice = createSlice({
  name: 'imageProduct',
  initialState: {
    loading: false,
    hasErrors: false,
    barcode: null,
  },
  reducers: {
    removeBarcode: state => {
      state.barcode = null;
      state.hasErrors = false;
    },
    initError: state => {
      state.hasErrors = false;
    },
    initBarcode: state => {
      state.barcode = null;
    },
  },
  extraReducers: {
    [fetchBarcode.pending]: state => {
      state.loading = true;
    },
    [fetchBarcode.fulfilled]: (state, {payload}) => {
      state.barcode = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchBarcode.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  removeBarcode,
  initError,
  initBarcode,
} = imageProductSlice.actions;
export default imageProductSlice.reducer;
