import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllLeads,
  createNewLead,
  updateLead,
} from "api/crmApis";

// import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllLeads = createAsyncThunk(
  "actions/getAllLeads",
  async () => await getAllLeads()
);

export const addLead = createAsyncThunk(
  "actions/createLead",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createNewLead(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

// export const updateLeadValue = createAsyncThunk(
//   "actions/updateLeadValue",
//   async (data, { rejectWithValue }) => {
//     try {
//       await updateLead(data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   }
// );

export const leadsSlice = createSlice({
  name: "leads",
  initialState: [],
  reducers: {
    updateLeadsCard(state, action) {
      const { payload } = action;
      return payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addLead.fulfilled, (state, action) => {
      const { payload } = action;
      const currentCol = state?.[0];

      if (currentCol?.leads) {
        currentCol.leads = [payload, ...currentCol.leads];
      }
    });

    builder.addCase(fetchAllLeads.fulfilled, (state, action) => action.payload);

    // builder.addCase(updateLeadValue.fulfilled, (state, action) => {
    //   const { payload } = action;

    //   let selectedIndex = 0;

    //   const updateCol = state?.find((col, index) => {
    //     selectedIndex = index;
    //     return col?.leadStatus === payload?.leadStatus;
    //   });

    //   console.log(current(updateCol))
    //   state[selectedIndex] = updateCol;
    // });
  },
});

export const { updateLeadsCard } = leadsSlice.actions;
export default leadsSlice.reducer;
