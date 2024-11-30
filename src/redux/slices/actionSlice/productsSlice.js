import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getAllProducts, 
  createProduct,
  updateProduct,
} from "api/masterApi";

export const fetchAllProducts = createAsyncThunk(
  "actions/getAllProducts",
  async () => await getAllProducts()
);

export const addProduct = createAsyncThunk(
  "actions/addProducts",
  async (data, { rejectWithValue }) => {
    try {
      await createProduct(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateProductValue = createAsyncThunk(
  "actions/updateProductValue",
  async (data, { rejectWithValue }) => {
    try {
      await updateProduct(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);


export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    // addProduct: (state, action) => {
    //   console.log(action.payload);
    //   state.push({
    //     ...action.payload,
    //     id: state.length,
    //   });
    // },
    // updateLead: (state, action) => {
    //   const rowData = action.payload;
    //   state[rowData?.id - 1] = rowData;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      const updatedProducts = action.payload?.map((product, id) => ({
        id: id + 1,
        ...product,
      }));
      return updatedProducts;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      const updatedProducts = {
        id: state?.length,
        ...action.payload,
      }
      state.unshift(updatedProducts);
    });

    builder.addCase(updateProductValue.fulfilled, (state, action) => {
      const itemIndex = action.payload.id;
      state[itemIndex] = action.payload;
    });
  },
});

// export const {addProduct} = productsSlice.actions;

export default productsSlice.reducer;
