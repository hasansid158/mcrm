import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminPermissions } from "api/masterApi";

export const fetchAdminPermissions = createAsyncThunk(
  "actions/fetchAdminPermissions",
  async () => await getAdminPermissions()
);

export const adminPermissionsSlice = createSlice({
  name: "adminPermissions",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAdminPermissions.fulfilled, (state, action) => action.payload);
  },
});

export default adminPermissionsSlice.reducer;
