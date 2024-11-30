import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGRAreport,
  getProcessedreport,
  getStockOnHandReport,
  getReceivedReport,
  getReadyforsaleReport
} from "api/masterApi";

// Thunks for fetching each report
export const fetchGRAReport = createAsyncThunk(
  "reports/fetchGRAReport",
  async () => await getGRAreport()
);

export const fetchProcessedreport = createAsyncThunk(
  "reports/fetchProcessedreport",
  async () => await getProcessedreport()
);

export const fetchStockOnHandReport = createAsyncThunk(
  "reports/fetchStockOnHandReport",
  async () => await getStockOnHandReport()
);

export const fetchReceivedReport = createAsyncThunk(
  "reports/fetchReceivedReport",
  async () => await getReceivedReport()
);

export const fetchReadyforsaleReport = createAsyncThunk(
  "reports/fetchReadyforsaleReport",
  async () => await getReadyforsaleReport()
);

export const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    GRAReport: null,
    ErasureReport: null,
    StockOnHandReport: null,
    ReceivedReport: null,
    ReadyForSaleReport: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGRAReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGRAReport.fulfilled, (state, action) => {
        state.loading = false;
        state.GRAReport = action.payload;
      })
      .addCase(fetchGRAReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProcessedreport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessedreport.fulfilled, (state, action) => {
        state.loading = false;
        state.ErasureReport = action.payload;
      })
      .addCase(fetchProcessedreport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchStockOnHandReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockOnHandReport.fulfilled, (state, action) => {
        state.loading = false;
        state.StockOnHandReport = action.payload;
      })
      .addCase(fetchStockOnHandReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchReceivedReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedReport.fulfilled, (state, action) => {
        state.loading = false;
        state.ReceivedReport = action.payload;
      })
      .addCase(fetchReceivedReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchReadyforsaleReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadyforsaleReport.fulfilled, (state, action) => {
        state.loading = false;
        state.ReadyForSaleReport = action.payload;
      })
      .addCase(fetchReadyforsaleReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer;