import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      state.isLogin = true;
      cookies.set('token', payload, {
        path: '/',
        maxAge: 3600 * 12, // 12 hours
      });
    },
    logout: (state) => {
      state.isLogin = false;
      cookies.remove('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
