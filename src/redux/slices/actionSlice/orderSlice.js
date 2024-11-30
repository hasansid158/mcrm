import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getDispatchOrders,
  createDispatchOrder,
  updateDispatchOrder,

  // createPaymentOrder,
  // getPaymentOrders,
  // updatePaymentOrder,

  createPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,

  createSalesOrder,
  getSalesOrders,
  updateSalesOrder,

  createWorkOrder,
  getWorkOrders,
  updateWorkOrder,

  getInvoices,
  createInvoice,
  updateInvoice,
} from "api/orderApis";

import { findIndex } from "lodash";
import { replaceObjectsInArray } from "utils/helperFunctions";

//dispatch
export const fetchDispatchOrder = createAsyncThunk(
  "actions/fetchDispatchOrder",
  async () => await getDispatchOrders()
);
export const addDispatchOrder = createAsyncThunk(
  "actions/createDispatchOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createDispatchOrder(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
export const updateDispatchValue = createAsyncThunk(
  "actions/updateDispatchValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateDispatchOrder(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
////

//payment
// export const fetchPaymentOrder = createAsyncThunk(
//   "actions/fetchPaymentOrder",
//   async () => await getPaymentOrders()
// );
// export const addPaymentOrder = createAsyncThunk(
//   "actions/addPaymentOrder",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await createPaymentOrder(data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   }
// );
// export const updatePaymentValue = createAsyncThunk(
//   "actions/updatePaymentValue",
//   async (data, { rejectWithValue }) => {
//     try {
//       await updatePaymentOrder(data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   }
// );
////

//purchase
export const fetchPurchaseOrder = createAsyncThunk(
  "actions/fetchPurchaseOrder",
  async () => await getPurchaseOrders()
);
export const addPurchaseOrder = createAsyncThunk(
  "actions/addPurchaseOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createPurchaseOrder(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
export const updatePurchaseValue = createAsyncThunk(
  "actions/updatePurchaseValue",
  async (data, { rejectWithValue }) => {
    try {
      await updatePurchaseOrder(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
////

//sales
export const fetchSalesOrder = createAsyncThunk(
  "actions/fetchSalesOrder",
  async () => await getSalesOrders()
);
export const addSalesOrder = createAsyncThunk(
  "actions/createSalesOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createSalesOrder(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
export const updateSalesValue = createAsyncThunk(
  "actions/updateSalesValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateSalesOrder(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
////

//work
export const fetchWorkOrder = createAsyncThunk(
  "actions/fetchWorkOrder",
  async () => await getWorkOrders()
);
export const addWorkOrder = createAsyncThunk(
  "actions/addWorkOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createWorkOrder(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
export const updateWorkValue = createAsyncThunk(
  "actions/updateWorkValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateWorkOrder(data, data?.workOrderID);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
////

//invoices
export const fetchInvoices = createAsyncThunk(
  "actions/fetchInvoices",
  async () => await getInvoices()
);
export const addInvoice = createAsyncThunk(
  "actions/addInvoice",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createInvoice(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
export const updateInvoiceValue = createAsyncThunk(
  "actions/updateInvoiceValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateInvoice(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
////


//need to work on update for all of these
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    dispatchOrder: [],
    payment: [],
    purchase: [],
    sales: [],
    work: [],
    invoice: [],
  },

  extraReducers: (builder) => {
    builder.addCase(addDispatchOrder.fulfilled, (state, action) => ({
      ...state,
      dispatchOrder: [
        action.payload,
        ...state?.dispatchOrder,
      ]
    }));
    builder.addCase(fetchDispatchOrder.fulfilled, (state, action) => ({
      ...state,
      dispatchOrder: action?.payload
    }));
    builder.addCase(updateDispatchValue.fulfilled, (state, action) => {
      const index = findIndex(state?.dispatchOrder, { dispatchId: action?.payload?.dispatchId });
      if (index === undefined) return;
      state.dispatchOrder[index] = action.payload;
    });
/////////////////////////////////////////////////////////////////////////////
    // builder.addCase(addPaymentOrder.fulfilled, (state, action) => {
    //   const updatedData = {
    //     id: state?.payment?.length + 1,
    //     ...action.payload,
    //   }
    //   return ({
    //     ...state,
    //     payment: [
    //       updatedData,
    //       ...state?.payment,

    //     ]
    //   });
    // });
    // builder.addCase(fetchPaymentOrder.fulfilled, (state, action) => action?.pay);
    // builder.addCase(updatePaymentValue.fulfilled, (state, action) => {
    //   const itemIndex = action.payload.id;
    //   state[itemIndex] = action.payload;
    // });
/////////////////////////////////////////////////////////////////////////////
    builder.addCase(fetchPurchaseOrder.fulfilled, (state, action) => ({
      ...state,
      purchase: action?.payload
    }));
    builder.addCase(addPurchaseOrder.fulfilled, (state, action) => {
      return ({
        ...state,
        purchase: [
          action.payload,
          ...state?.purchase,

        ]
      });
    });
    builder.addCase(updatePurchaseValue.fulfilled, (state, action) => {
      const updatedState = replaceObjectsInArray(current(state?.sales), 'purchaseOrderId', action.payload);
      return ({
        ...state,
        purchase: updatedState
      });
    });
/////////////////////////////////////////////////////////////////////////////
    builder.addCase(fetchSalesOrder.fulfilled, (state, action) => ({
      ...state,
      sales: action?.payload
    }));
    builder.addCase(addSalesOrder.fulfilled, (state, action) => {
      return ({
        ...state,
        sales: [
          action.payload,
          ...state?.sales,

        ]
      });
    });
    builder.addCase(updateSalesValue.fulfilled, (state, action) => {
      const updatedState = replaceObjectsInArray(current(state?.sales), 'salesOrderID', action.payload);
      return ({
        ...state,
        sales: updatedState
      });
    });
/////////////////////////////////////////////////////////////////////////////
    builder.addCase(fetchWorkOrder.fulfilled, (state, action) => ({
      ...state,
      work: action?.payload
    }));
    builder.addCase(addWorkOrder.fulfilled, (state, action) => {
      return ({
        ...state,
        work: [
          action.payload,
          ...state?.work,
        ]
      });
    });
    builder.addCase(updateWorkValue.fulfilled, (state, action) => {
      const { work } = state;
      return ({
        ...state,
        work: replaceObjectsInArray(current(work), 'workOrderID', action.payload),
      })
    });

    builder.addCase(addInvoice.fulfilled, (state, action) => ({
      ...state,
      invoice: [
        action.payload,
        ...state?.invoice,

      ]
    }));
    builder.addCase(fetchInvoices.fulfilled, (state, action) => ({
      ...state,
      invoice: action?.payload
    }));
    builder.addCase(updateInvoiceValue.fulfilled, (state, action) => {
      const index = findIndex(state?.invoice, { invoiceOrderID: action?.payload?.invoiceOrderID });
      if (index === undefined) return;
      state.invoice[index] = action.payload;
    });

  },
});

export default orderSlice.reducer;
