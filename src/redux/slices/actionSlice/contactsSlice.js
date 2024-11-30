import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllContacts,
  updateContact,
  createNewContact,
  createBulkContact
} from "api/crmApis";

import { replaceObjectsInArray } from "utils/helperFunctions";

export const fetchAllContacts = createAsyncThunk(
  "actions/fetchAllContacts",
  async () => await getAllContacts()
);

export const updateContactsValue = createAsyncThunk(
  "actions/updateContactsValue",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateContact(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const addNewContact = createAsyncThunk(
  "actions/addNewContact",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createNewContact(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const addBulkContacts = createAsyncThunk(
  "actions/addBulkContacts",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createBulkContact(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllContacts.fulfilled, (state, action) => action?.payload);

    builder.addCase(addNewContact.fulfilled, (state, action) => {state?.unshift(action?.payload)});

    builder.addCase(updateContactsValue.fulfilled, (state, action) => {
      return replaceObjectsInArray(state, 'contactId', action?.payload);
    });
    builder.addCase(addBulkContacts.fulfilled, (state, action) => {
      state.unshift(...action.payload);
    });

  },
});

export default contactsSlice.reducer;
