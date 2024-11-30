import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { merge } from "lodash";

import {
  getAssetStatus,
  getAccountList,
  getContactList,
  getMakes,
  getWarehouses,
  getItemTypes,
  getLocations,
  getProductList,
  getWorkOrderList,
  getCustomerDropDownList,
  getLoadsList,
  getUsers,
  getLeadStatusList,
  getQuoteStatusList,
  getTaskCategoryList,
  getSaleOrderStatuses,
  getSaleOrderTypes,
  getAllStatusList,
  getLeadsType,
  getITADServices,
  getWorkOrderServices,
  getWorkOrderStatus,
  getSupplierList,
  // getServiceItems
} from "api/listApis";
import { getAssetTransferLocations } from "api/masterApi";
import {
  getPOStatuses,
  getPOTypes,

  getDispatchStatuses,
  getDispatchMethods,
  getDispatchTypes,
} from "api/orderApis";
import { getTimeSheetStatuses } from "api/interactionsApis";

export const fetchAssetStatus = createAsyncThunk(
  "actions/getAssetStatus",
  async () => await getAssetStatus()
);

export const fetchWorkOrderList = createAsyncThunk(
  "actions/fetchWorkOrderList",
  async () => await getWorkOrderList()
);

export const fetchAccountList = createAsyncThunk(
  "actions/getAccountList",
  async () => await getAccountList()
);
export const fetchContactList = createAsyncThunk(
  "actions/getContactList",
  async () => await getContactList()
);
export const fetchMakes = createAsyncThunk(
  "actions/getMakes",
  async () => await getMakes()
);

// export const fetchProjects = createAsyncThunk(
//   "actions/getProjects",
//   async () => await getProjects()
// );

export const fetchLeadTypes = createAsyncThunk(
  "actions/fetchLeadTypes",
  async () => await getLeadsType()
);

export const fetchLoads = createAsyncThunk(
  "actions/fetchLoads",
  async (data, { rejectWithValue }) => {
    try {
      return await getLoadsList(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.title)
    }
  }
);


export const fetchWarehouses = createAsyncThunk(
  "actions/getWarehouses",
  async () => await getWarehouses()
);

export const fetchItemTypes = createAsyncThunk(
  "actions/getItemTypes",
  async () => await getItemTypes()
);

export const fetchLocations = createAsyncThunk(
  "actions/getLocations",
  async () => await getLocations()
);

export const fetchProductList = createAsyncThunk(
  "actions/fetcProductList",
  async () => await getProductList()
);

export const fetchCustomerDropDownList = createAsyncThunk(
  "actions/fetchCustomerDropDownList",
  async () => await getCustomerDropDownList()
);
export const fetchUserList = createAsyncThunk(
  "actions/fetchUserList",
  async () => await getUsers()
);

export const fetchLeadStatusList = createAsyncThunk(
  "actions/fetchLeadStatusList",
  async () => await getLeadStatusList()
);

export const fetchQuoteStatusList = createAsyncThunk(
  "actions/fetchQuoteStatusList",
  async () => await getQuoteStatusList()
);

export const fetchAllStatusList = createAsyncThunk(
  "actions/fetchAllStatusList",
  async () => await getAllStatusList()
);

// export const fetchAllServiceItems = createAsyncThunk(
//   "actions/fetchAllServiceItems",
//   async () => await getServiceItems()
// );

export const fetchTaskCategoryList = createAsyncThunk(
  "actions/fetchTaskCategoryList",
  async () => await getTaskCategoryList()
);

//sale order apis
export const fetchSaleOrderStatuses = createAsyncThunk(
  "actions/fetchSaleOrderStatuses",
  async () => await getSaleOrderStatuses()
);
export const fetchSaleOrderTypes = createAsyncThunk(
  "actions/fetchSaleOrderTypes",
  async () => await getSaleOrderTypes()
);

//asset transfer locations
export const fetchAssetTransferLocations = createAsyncThunk(
  "actions/fetchAssetTransferLocations",
  async () => await getAssetTransferLocations()
);

//service lists
export const fetchITADServices = createAsyncThunk(
  "actions/fetchITADServices",
  async () => await getITADServices()
);
export const fetchWorkOrderServices = createAsyncThunk(
  "actions/fetchWorkOrderServices",
  async () => await getWorkOrderServices()
);

export const fetchWorkOrderStatus = createAsyncThunk(
  "actions/fetchWorkOrderStatus",
  async () => await getWorkOrderStatus()
);

export const fetchPOStatuses = createAsyncThunk(
  "actions/fetchPOStatuses",
  async () => await getPOStatuses()
);

export const fetchPOTypes = createAsyncThunk(
  "actions/fetchPOTypes",
  async () => await getPOTypes()
);

export const fetchDispatchStatuses = createAsyncThunk(
  "actions/fetchDispatchStatuses",
  async () => await getDispatchStatuses()
);
export const fetchDispatchMethods = createAsyncThunk(
  "actions/fetchDispatchMethods",
  async () => await getDispatchMethods()
);
export const fetchDispatchTypes = createAsyncThunk(
  "actions/fetchDispatchTypes",
  async () => await getDispatchTypes()
);

export const fetchSupplierList = createAsyncThunk(
  "actions/fetchSupplierList",
  async () => await getSupplierList()
);

export const fetchTimeSheetStatuses = createAsyncThunk(
  "actions/fetchTimeSheetStatuses",
  async () => await getTimeSheetStatuses()
);

const listSlice = createSlice({
  name: 'lists',
  initialState: {
    userList: {
      detail: [],
      list: [],
    },
  },
  reducers: {
    addToList(state, action) {
      return {...state, ...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssetStatus.fulfilled, (state, action) => {
      return ({
        ...state,
        assetStatus: action.payload,
      });
    });
    builder.addCase(fetchAccountList.fulfilled, (state, action) => {
      return ({
        ...state,
        accountList: action.payload,
      });
    });
    builder.addCase(fetchWorkOrderList.fulfilled, (state, action) => {
      return ({
        ...state,
        workOrderList: action.payload,
      });
    });
    builder.addCase(fetchContactList.fulfilled, (state, action) => {
      return ({
        ...state,
        contactList: action.payload,
      });
    });
    builder.addCase(fetchMakes.fulfilled, (state, action) => {
      return ({
        ...state,
        makes: action.payload,
      });
    });
    // builder.addCase(fetchProjects.fulfilled, (state, action) => {
    //   return ({
    //     ...state,
    //     projects: action.payload,
    //   });
    // });
      builder.addCase(fetchLeadTypes.fulfilled, (state, action) => {
      return {
        ...state,
        leadTypes: action.payload,
      };
    });
    builder.addCase(fetchLoads.fulfilled, (state, action) => {
      return ({
        ...state,
        loads: action.payload,
      });
    });
    builder.addCase(fetchWarehouses.fulfilled, (state, action) => {
      return ({
        ...state,
        warehouses: action.payload,
      });
    });
    builder.addCase(fetchItemTypes.fulfilled, (state, action) => {
      return ({
        ...state,
        itemTypes: action.payload,
      });
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      return ({
        ...state,
        locations: action.payload,
      });
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      return ({
        ...state,
        productList: action.payload,
      });
    });

    builder.addCase(fetchCustomerDropDownList.fulfilled, (state, action) => {
      return ({
        ...state,
        customerList: action.payload,
      });
    });

    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      const { payload } = action;

      const userListData = payload?.map(({ userFirstName, userLastName, userID }) => ({
        id: userID,
        value: `${userFirstName || ''} ${userLastName || ''}`.trim(),
      }));
      return ({
        ...state,
        userList: {
          detail: payload,
          list:userListData,
        },
      });
    });

    builder.addCase(fetchLeadStatusList.fulfilled, (state, action) => {
      return ({
        ...state,
        leadStatusList: action.payload,
      });
    });

    builder.addCase(fetchQuoteStatusList.fulfilled, (state, action) => {
      return ({
        ...state,
        dealStatusList: action.payload,
      });
    });

    builder.addCase(fetchAllStatusList.fulfilled, (state, action) => {
      return ({
        ...state,
        allStatusList: action.payload,
      });
    });

    // builder.addCase(fetchAllServiceItems.fulfilled, (state, action) => {
    //   return ({
    //     ...state,
    //     allServiceItems: action.payload,
    //   });
    // });

    builder.addCase(fetchTaskCategoryList.fulfilled, (state, action) => {

      const { payload } = action;

      const taskCategoryType = payload?.map(item => item?.categoryType);
      const categoryObject = merge(...payload.map(item => ({ [item.categoryType]: item.categories })));

      return ({
        ...state,
        taskCategoryList: {
          categoryTypes: taskCategoryType,
          categories: categoryObject,
        },
      });
    });

    builder.addCase(fetchSaleOrderStatuses.fulfilled, (state, action) => {
      return ({
        ...state,
        saleOrderStatuses: action.payload,
      });
    });
    builder.addCase(fetchSaleOrderTypes.fulfilled, (state, action) => {
      return ({
        ...state,
        saleOrderTypes: action.payload,
      });
    });

    builder.addCase(fetchAssetTransferLocations.fulfilled, (state, action) => {
      return ({
        ...state,
        assetTransferLocations: action.payload,
      });
    });

    builder.addCase(fetchITADServices.fulfilled, (state, action) => {
      return ({
        ...state,
        itadServices: action.payload,
      });
    });

    builder.addCase(fetchWorkOrderServices.fulfilled, (state, action) => {
      return ({
        ...state,
        workOrderServices: action.payload,
      });
    });

    builder.addCase(fetchWorkOrderStatus.fulfilled, (state, action) => {
      return ({
        ...state,
        workOrderStatus: action.payload,
      });
    });

    builder.addCase(fetchPOStatuses.fulfilled, (state, action) => {
      return ({
        ...state,
        pOStatus: action.payload,
      });
    });

    builder.addCase(fetchPOTypes.fulfilled, (state, action) => {
      return ({
        ...state,
        pOTypes: action.payload,
      });
    });

    builder.addCase(fetchDispatchStatuses.fulfilled, (state, action) => {
      return ({
        ...state,
        dOStatus: action.payload,
      });
    });
    builder.addCase(fetchDispatchMethods.fulfilled, (state, action) => {
      return ({
        ...state,
        dOMethods: action.payload,
      });
    });
    builder.addCase(fetchDispatchTypes.fulfilled, (state, action) => {
      return ({
        ...state,
        dOTypes: action.payload,
      });
    });

    builder.addCase(fetchSupplierList.fulfilled, (state, action) => {
      return ({
        ...state,
        supplierList: action.payload,
      });
    });

    builder.addCase(fetchTimeSheetStatuses.fulfilled, (state, action) => {
      return ({
        ...state,
        timeSheetStatuses: action.payload,
      });
    });
  },
});

export const { addToList } = listSlice.actions;
export default listSlice.reducer;