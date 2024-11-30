import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllQuotes,
  createQuote,
  updateQuote,
} from "api/crmApis";

export const fetchAllQuotes = createAsyncThunk(
  "actions/getAllQuotes",
  async () => await getAllQuotes()
);

export const addQuote = createAsyncThunk(
  "actions/createQuote",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createQuote(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateQuoteValue = createAsyncThunk(
  "actions/updateQuoteValue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateQuote(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: [],
  reducers: {
    updateQuotesCard(state, action) {
      const { payload } = action;
      return payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addQuote.fulfilled, (state, action) => {
      const draftIndex = state?.findIndex(item => {
        return item?.quoteStatus === 'Draft'
      });
      draftIndex !== -1 && state?.[draftIndex]?.quotes?.unshift(action.payload);
    });

    builder.addCase(fetchAllQuotes.fulfilled, (state, action) => action.payload);
  },
});

export const { updateQuotesCard } = quotesSlice.actions;
export default quotesSlice.reducer;
