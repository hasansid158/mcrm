import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllMeetings,
  createMeeting,
  updateMeeting
} from "api/interactionsApis";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllMeetings = createAsyncThunk(
  "actions/fetchAllMeetings",
  async () => await getAllMeetings()
);

export const addMeeting = createAsyncThunk(
  "actions/addMeeting",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createMeeting(data);
      return {
        ...data,
        meetingId: res?.data?.meetingId,
      };

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const changeMeeting = createAsyncThunk(
  "actions/changeMeeting",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateMeeting(data);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(fetchAllMeetings.fulfilled, (state, action) => (
      action.payload?.filter(item => (
        !!item?.meetingStart && !!item?.meetingEnd
      ))
    ));
    builder.addCase(addMeeting.fulfilled, (state, action) => {state?.unshift(action.payload)});

    builder.addCase(changeMeeting.fulfilled, (state, action) => {
      const updatedState = replaceObjectsInArray(current(state), 'meetingId', action.payload);
      return updatedState;
    });
  },
});

export default meetingSlice.reducer;
