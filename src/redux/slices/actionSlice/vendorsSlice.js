import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVendorList,
  createVendor,
  updateVendor,
} from "api/crmApis";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllVendorList = createAsyncThunk(
  "actions/fetchAllVendorList",
  async () => await getAllVendorList()
);

export const addVendor = createAsyncThunk(
  "actions/addVendor",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createVendor(data);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateVendorValue = createAsyncThunk(
  "actions/updateVendorValue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateVendor(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const vendorsSlice = createSlice({
  name: "Vendors",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllVendorList.fulfilled, (state, action) => action.payload);

    builder.addCase(addVendor.fulfilled, (state, action) => {
      state.unshift(action?.payload);
    });

    builder.addCase(updateVendorValue.fulfilled, (state, action) => {
      return replaceObjectsInArray(state, 'vendorId', action?.payload);
    });
  },
});

export default vendorsSlice.reducer;
