import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGraList } from "api/masterApi";

export const fetchGraList = createAsyncThunk(
  "actions/fetchGraList",
  async () => await getGraList()
);

export const graListSlice = createSlice({
  name: "graList",
  initialState: [],
  reducers: {
    addGraItem: (state, action) => { state.unshift(action.payload)}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraList.fulfilled, (state, action) => action.payload);
  },
});

export const { addGraItem } = graListSlice.actions;
export default graListSlice.reducer;
