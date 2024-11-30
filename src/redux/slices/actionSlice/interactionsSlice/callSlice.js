import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCalls,
  createCall,
} from "api/interactionsApis";

export const fetchAllCalls = createAsyncThunk(
  "actions/fetchAllCalls",
  async () => await getAllCalls()
);

export const addCall = createAsyncThunk(
  "actions/addCall",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCall(data);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const callSlice = createSlice({
  name: "call",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(fetchAllCalls.fulfilled, (state, action) => action.payload);

    builder.addCase(addCall.fulfilled, (state, action) => {state?.unshift(action.payload)});

  },
});

export default callSlice.reducer;
