import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAssets,
  createAsset,
  createBulkAsset,
  updateAssets,
} from "api/masterApi";

import { isEmpty } from "lodash";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllAssets = createAsyncThunk(
  "actions/fetchAllAssets",
  async () => await getAllAssets()
);

export const addAsset = createAsyncThunk(
  "actions/addAsset",
  async (data, { rejectWithValue }) => {
    try {
      await createAsset(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const addBulkAssets = createAsyncThunk(
  "actions/addBulkAssets",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createBulkAsset(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateAssetValue = createAsyncThunk(
  "actions/updateAssetValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateAssets(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const assetSlice = createSlice({
  name: "assets",
  initialState: [],
  reducers: {
    updateAssetItem: (state, action) => {
      const { payload } = action;
      const updatedAssets = replaceObjectsInArray(state, 'assetID', payload);
      return updatedAssets;
    },
    updateAssetsWithIndex: (state, action) => {
      const {
        item = {},
        index,
      } = action.payload;

      if (isEmpty(item)) return;

      const updatedAssets = [...state];
      updatedAssets[index] = item;

      return updatedAssets;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAssets.fulfilled, (state, action) => {
      const updatedAssets = action.payload?.map((asset, idx) => ({
        // id: idx + state?.length,
        ...asset,
        // project: {id: 1, value: 'MasterCRM1'},
        load: 'LOAD001',
        // workOrder: 'WO0001',
      }));
      return updatedAssets;
    });

    builder.addCase(addAsset.fulfilled, (state, action) => {
      const updatedAssets = {
        id: state?.length,
        ...action.payload,
      }
      state.unshift(updatedAssets);
    });

    builder.addCase(updateAssetValue.fulfilled, (state, action) => {
      const itemIndex = action.payload.id;
      state[itemIndex] = action.payload;
    });

    builder.addCase(addBulkAssets.fulfilled, (state, action) => {
      const data = action.payload;

      const dataWithId = data?.map((asset, idx) => ({
        id: idx + state.length,
        ...asset,
      }));
      state.unshift(...dataWithId);
    });
  },
});

export const {
  updateAssetsWithIndex,
  updateAssetItem,
} = assetSlice.actions;
export default assetSlice.reducer;
