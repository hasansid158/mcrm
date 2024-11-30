import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'meetings',
  initialState: [],
  reducers: {
    setSelectedDate: (state, action) => {
      const { payload } = action;
      state?.unshift(payload);
    },
    removeEvent: (state, action) => {
      const { payload } = action;
      state?.splice(payload, 1);
    },
  }
});

export const { 
  setSelectedDate,
  removeEvent,
} = calendarSlice.actions;
export default calendarSlice.reducer;