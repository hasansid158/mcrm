import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllLoads,
  createLoad,
} from "api/masterApi";

export const fetchAllLoads = createAsyncThunk(
  "actions/fetchAllLoads",
  async () => await getAllLoads()
);

export const addLoad = createAsyncThunk(
  "actions/addLoad",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createLoad(data);
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const loadsSlice = createSlice({
  name: "loads",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(fetchAllLoads.fulfilled, (state, action) => action.payload);
    builder.addCase(addLoad.fulfilled, (state, action) => {state?.unshift(action.payload)});

  },
});

export default loadsSlice.reducer;
