import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllTimeSheets,
  createTimeSheet,
  updateTimeSheet,
} from "api/interactionsApis";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllTimeSheets = createAsyncThunk(
  "actions/fetchAllTimeSheets",
  async () => await getAllTimeSheets()
);

export const addTimeSheet = createAsyncThunk(
  "actions/addTimeSheet",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createTimeSheet(data);
      return res?.data;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateTimeSheetValue = createAsyncThunk(
  "actions/updateTimeSheetValue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateTimeSheet(data);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const timeSheetSlice = createSlice({
  name: "timeSheet",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(fetchAllTimeSheets.fulfilled, (state, action) => action.payload);

    builder.addCase(addTimeSheet.fulfilled, (state, action) => {state?.unshift(action.payload)});

    builder.addCase(updateTimeSheetValue.fulfilled, (state, action) => {
      const updatedState = replaceObjectsInArray(current(state), 'timeSheetId', action.payload);
      return updatedState;
    });

  },
});

export default timeSheetSlice.reducer;
