import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHomepageData,
} from "api/masterApi";

export const fetchHomepageData = createAsyncThunk(
  "actions/fetchHomepageData",
  async () => await getHomepageData()
);

export const homeSlice = createSlice({
  name: "home",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchHomepageData.fulfilled, (state, action) => action.payload);


  },
});

export default homeSlice.reducer;
