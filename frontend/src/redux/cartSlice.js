import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addItemToCartApi,
  getUserCartItemApi,
  removeUserCartItemApi,
  updateCartItemQuantity,
} from "../service/apiCollections";

const initialState = {
  cartItems: [],
  totalItems: 0,
  isLoading: true,
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/additem",

  async product => {
    try {
      const response = await addItemToCartApi({
        product: product._id,
      });

      let payload = {
        ...product,
        quantity: response?.data?.quantity || 1,
      };

      return payload;
    } catch (error) {
      return error;
    }
  },
);

export const getUserCartItemAsync = createAsyncThunk(
  "cart/getitem",

  async () => {
    try {
      const response = await getUserCartItemApi();

      let payload = response.data.map(item => {
        return {
          ...item.product,
          quantity: item.quantity,
          id: item._id,
        };
      });

      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      return error;
    }
  },
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItem",

  async id => {
    try {
      const response = await removeUserCartItemApi(id);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

// UPDATE QUANTITY THUNK

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/update-quantity",

  async ({ id, quantity }) => {
    try {
      await updateCartItemQuantity(id, quantity);

      return {
        id,
        quantity,
      };
    } catch (error) {
      return error.response.data;
    }
  },
);

const CartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    pushItemToCartList: (state, action) => {
      state.isLoading = false;

      state.cartItems.push(action.payload);
    },
  },

  extraReducers: builder => {
    builder

      .addCase(
        addItemToCartAsync.pending,

        state => {
          state.isLoading = true;
        },
      )

      .addCase(
        addItemToCartAsync.fulfilled,

        (state, action) => {
          state.isLoading = false;

          let idx = state.cartItems.findIndex(
            item => item._id === action.payload._id,
          );

          if (idx < 0) {
            state.cartItems.push(action.payload);
          }

          state.totalItems += 1;
        },
      )

      .addCase(
        getUserCartItemAsync.pending,

        state => {
          state.isLoading = true;
        },
      )

      .addCase(
        getUserCartItemAsync.fulfilled,

        (state, action) => {
          state.isLoading = false;

          state.cartItems = action.payload;

          state.totalItems = action.payload.length;
        },
      )

      .addCase(
        getUserCartItemAsync.rejected,

        state => {
          state.cartItems = [];

          state.isLoading = false;
        },
      )

      .addCase(
        removeCartItemAsync.fulfilled,

        (state, action) => {
          state.cartItems = state.cartItems.filter(
            item => item.id !== action.payload._id,
          );

          state.totalItems = state.cartItems.length;
        },
      )

      .addCase(
        updateCartQuantityAsync.fulfilled,

        (state, action) => {
          let idx = state.cartItems.findIndex(
            item => item.id === action.payload.id,
          );

          if (idx >= 0) {
            state.cartItems[idx].quantity = action.payload.quantity;
          }
        },
      );
  },
});

export default CartSlice.reducer;
