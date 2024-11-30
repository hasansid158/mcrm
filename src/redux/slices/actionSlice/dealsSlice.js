import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  createDeal,
  getAllDeals,
  updateDeals,
} from "api/crmApis";

import { stageOrder } from "enum/kanbanEnum";
import _ from "lodash";

export const fetchAllDeals = createAsyncThunk(
  "actions/fetchAllDeals",
  async () => await getAllDeals()
);

export const addDeal = createAsyncThunk(
  "actions/addDeal",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createDeal(data);
      return res;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateDealsValue = createAsyncThunk(
  "actions/updateDealsValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateDeals(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const dealsSlice = createSlice({
  name: "deals",
  initialState: [],
  reducers: {
    updateDealsCard(state, action) {
      const { payload } = action;
      return payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addDeal.fulfilled, (state, action) => {
      const { payload } = action;

      state?.map(item => {
        if (item?.stage?.toLowerCase() === payload?.stage?.toLowerCase()) {
          return item?.deals?.unshift(payload)
        }
        return state;
      })
    });

    builder.addCase(fetchAllDeals.fulfilled, (state, action) => {
      const updatedData = action.payload?.map((data, id) => ({
        ...data,
        stage: data?.stage,
      }));

      const sortedData = _.sortBy(updatedData, obj => {
        const index = _.indexOf(stageOrder.Deal, obj.stage);
        return index !== -1 ? index : stageOrder.Deal?.length; // Assign a high index to unknown stages
    });

      return sortedData;
    });

    // builder.addCase(updateDealsValue.fulfilled, (state, action) => {
    //   const itemIndex = action.payload.id;
    //   state[itemIndex] = action.payload;
    // });
  },
});

export const { updateDealsCard } = dealsSlice.actions;
export default dealsSlice.reducer;
