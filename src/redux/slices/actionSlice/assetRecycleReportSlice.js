import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAssetRecycleReport
} from "api/masterApi";

export const fetchAssetRecyclingReport = createAsyncThunk(
  "actions/fetchAssetRecyclingReport",
  async () => await getAssetRecycleReport()
);


export const assetRecycleReportSlice = createSlice({
  name: "assetRecyclingReport",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAssetRecyclingReport.fulfilled, (state, action) => action.payload);
  },
});

export default assetRecycleReportSlice.reducer;
