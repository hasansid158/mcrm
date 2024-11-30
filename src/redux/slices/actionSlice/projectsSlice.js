import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProjects,
  createNewProject,
} from "api/masterApi";

export const fetchAllProjects = createAsyncThunk(
  "actions/fetchAllProjects",
  async () => await getAllProjects()
);

export const addProject = createAsyncThunk(
  "actions/addProject",
  async (data, { rejectWithValue }) => {
    try {
      await createNewProject(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => action.payload);

    builder.addCase(addProject.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });

  },
});

export default projectsSlice.reducer;
