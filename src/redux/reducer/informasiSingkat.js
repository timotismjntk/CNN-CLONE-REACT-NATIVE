import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

const initialState = {
  informasiSingkat: {},
  isLoadingInformasiSingkat: false,
};

export const getInformasiSingkat = createAsyncThunk(
  'informasiSingkat/getInformasiSingkat',
  async website_id => {
    const {data} = await http().get(`getInformasi?website_id=${website_id}`);
    return data;
  },
);

const informasiSingkatSlicer = createSlice({
  name: 'berita',
  initialState,
  reducers: {
    clearinformasiSingkat: (state, action) => {
      return {
        ...state,
        informasiSingkat: {},
        isLoadingInformasiSingkat: false,
      };
    },
  },
  extraReducers: {
    [getInformasiSingkat.pending]: state => {
      return {
        ...state,
        isLoadingInformasiSingkat: true,
      };
    },
    [getInformasiSingkat.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingInformasiSingkat: false,
        informasiSingkat: payload,
      };
    },
    [getInformasiSingkat.rejected]: state => {
      return {
        ...state,
        isLoadingInformasiSingkat: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearinformasiSingkat} = informasiSingkatSlicer.actions;

export default informasiSingkatSlicer.reducer;
