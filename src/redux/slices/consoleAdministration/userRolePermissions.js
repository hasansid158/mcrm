import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminPermissions, getAdminUserRolePermissions } from "api/masterApi";

export const fetchAdminUserRolePermissions = createAsyncThunk(
  "actions/fetchAdminUserRolePermissions",
  async () => await getAdminUserRolePermissions()
);

export const adminUserRolePermissionsSlice = createSlice({
  name: "adminUserRolePermissions",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAdminUserRolePermissions.fulfilled, (state, action) => action.payload);
  },
});

export default adminUserRolePermissionsSlice.reducer;
