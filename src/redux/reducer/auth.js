import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';
import QueryString from 'qs';

const initialState = {
  user: {},
  isLoading: false,
  isLoginUserModalSuccessOpen: true,
};

export const login = createAsyncThunk('auth/login', async nik => {
  const {data} = await http().get(`cekNik?nik=${nik}`);
  return data;
});

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showModalSuccess: (state, {payload}) => {
      return {
        ...state,
        isLoginUserModalSuccessOpen: payload.value || false,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: {},
        isLoginUserModalSuccessOpen: true,
      };
    },
    clearStatePengguna: (state, action) => {
      return {
        ...state,
        user: {},
        isLoading: false,
      };
    },
  },
  extraReducers: {
    [login.pending]: state => {
      return {
        ...state,
        isLoading: true,
        isLoginUserModalSuccessOpen: true,
      };
    },
    [login.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    },
    [login.rejected]: state => {
      return {
        ...state,
        isLoading: false,
        isLoginUserModalSuccessOpen: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {logout, clearStatePengguna, showModalSuccess} =
  authSlicer.actions;

export default authSlicer.reducer;
