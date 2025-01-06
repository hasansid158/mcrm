import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    errorDialogText: null,
    snackbar: {
      open: false,
      message: 'Server error occurred, please try again later.',
      options: {},
    },
    sideDrawerOpen: false,
  },
  reducers: {
    setErrorDialogText: (state, action) => {
      const defaultMsg =
        (action.payload === '' || action.payload === undefined) &&
        'Server error occurred, please try again.';
      state.errorDialogText = defaultMsg || action.payload;
    },

    setSnackBar: (state, action) => {
      state.snackbar = action.payload;
    },
    disableSnackBar: (state) => {
      state.snackbar.open = false;
    },

    toggleSideDrawer: (state, action) => {
      const { payload } = action;
      state.sideDrawerOpen =
        payload === undefined ? !state.sideDrawerOpen : payload;
    },
  },
});

export const {
  setErrorDialogText,
  setSnackBar,
  disableSnackBar,
  toggleSideDrawer,
} = commonSlice.actions;
export default commonSlice.reducer;
