import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAccounts,
  updateAccounts,
} from "api/masterApi";

export const fetchAllAccounts = createAsyncThunk(
  "actions/fetchAllAccounts",
  async () => await getAllAccounts()
);

export const updateAccountsValue = createAsyncThunk(
  "actions/updateAccountsValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateAccounts(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllAccounts.fulfilled, (state, action) => {
      const updatedAccounts = action.payload?.map((account, id) => ({
        id: id + 1,
        ...account,
      }));
      return updatedAccounts;
    });

    builder.addCase(updateAccountsValue.fulfilled, (state, action) => {
      const itemIndex = action.payload.id;
      state[itemIndex] = action.payload;
    });
  },
});

export default accountsSlice.reducer;
