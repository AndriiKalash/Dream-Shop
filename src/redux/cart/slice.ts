import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { ICartItems, StatusCart } from "../cart/type";

const initialState: ICartItems = {
  items: [],
  status: StatusCart.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // state.items =
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

const { reducer, actions } = cartSlice;
const { addToCart } = actions;
export default reducer;
