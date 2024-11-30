import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "api/masterApi";
import { uploadUserImage } from "api/profileApis";

import { blobToBase64, getFileFormData } from "utils/fileHelperFunctions";

export const fetchUserDetails = createAsyncThunk(
  "actions/fetchUserDetails",
  async () => await getUserDetails()
);

export const uploadUserAvatar = createAsyncThunk(
  "actions/uploadUserAvatar",
  async (data, { rejectWithValue }) => {
    try {
      await uploadUserImage(getFileFormData(data, 'logoFile'));

      const file = data?.[0]?.fileContent;
      return file ? await blobToBase64(file) : null;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => action.payload);

    builder.addCase(uploadUserAvatar.fulfilled, (state, action) => ({ ...state, userImage: action.payload }));
  },
});

export default userDetailsSlice.reducer;
