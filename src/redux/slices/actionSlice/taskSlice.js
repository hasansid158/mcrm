import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTasks,
  updateTasks,
  createTask,
} from "api/masterApi";

export const fetchAllTasks = createAsyncThunk(
  "actions/fetchAllTasks",
  async () => await getAllTasks()
);

export const addTask = createAsyncThunk(
  "actions/addTask",
  async (data, { rejectWithValue }) => {
    try {
      await createTask(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    updateTaskCard(state, action) {
      const { payload } = action;
      return payload;

    },

    deleteTaskLocal(state, action) {
      const { payload } = action;
      const {
        status,
        taskID,
      } = payload;

      // Find the index of the status object
      const statusIndex = state.findIndex(obj => obj.status === status);

      if (statusIndex !== -1) {
        // Create a copy of the status object
        const updatedStatusObject = {
          ...state[statusIndex],
          // Filter out the task with the given taskID
          items: state[statusIndex].items.filter(item => item.taskID !== taskID)
        };

        // Create a copy of the state array with the updated status object
        const updatedState = [...state];
        updatedState[statusIndex] = updatedStatusObject;

        return updatedState;
      }
      // If the status object is not found, return the current state unchanged
      return state;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => action.payload);

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });


    // builder.addCase(updateAccountsValue.fulfilled, (state, action) => {
    //   const itemIndex = action.payload.id;
    //   state[itemIndex] = action.payload;
    // });
  },
});

export const { updateTaskCard, deleteTaskLocal } = taskSlice.actions;
export default taskSlice.reducer;
