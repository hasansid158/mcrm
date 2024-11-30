import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAssetTestConditions,
  // submitAssetTestConditions,
} from "api/masterApi";

export const fetchAssetTestConditions = createAsyncThunk(
  "actions/fetchAssetTestConditions",
  async (data) => await getAssetTestConditions(data)
);

// export const postAssetTestConditions = createAsyncThunk(
//   "actions/updateDealsValue",
//   async (data, { rejectWithValue }) => {
//     try {
//       await submitAssetTestConditions(data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   }
// );

export const assetTestSlice = createSlice({
  name: "assetTestConditions",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAssetTestConditions.fulfilled, (state, action) => {
      const updatedData = action.payload?.map((data, id) => ({
        id: id + 1,
        ...data,
      }));
      return updatedData;
    });

    // builder.addCase(postAssetTestConditions.fulfilled, (state, action) => {
    //   const itemIndex = action.payload.id;
    //   console.log(state);
    //   console.log(itemIndex);
    //   console.log(action.payload);
    //   state[itemIndex] = action.payload;
    // });
  },
});

export default assetTestSlice.reducer;
