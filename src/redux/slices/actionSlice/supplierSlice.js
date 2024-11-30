import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
} from "api/crmApis";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllSuppliers = createAsyncThunk(
  "actions/fetchAllSuppliers",
  async () => await getAllSuppliers()
);

export const addSupplier = createAsyncThunk(
  "actions/addSupplier",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createSupplier(data);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateSupplierValue = createAsyncThunk(
  "actions/updateSupplierValue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateSupplier(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const supplierSlice = createSlice({
  name: "Suppliers",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllSuppliers.fulfilled, (state, action) => action.payload);

    builder.addCase(addSupplier.fulfilled, (state, action) => {
      state.unshift(action?.payload);
    });

    builder.addCase(updateSupplierValue.fulfilled, (state, action) => {
      return replaceObjectsInArray(state, 'supplierId', action?.payload);
    });
  },
});

export default supplierSlice.reducer;
