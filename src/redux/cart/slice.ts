import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { ICartItem, ICartItems, StatusCart } from "../cart/type";

const initialState: ICartItems = {
  items: [],
  status: StatusCart.LOADING,
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const findedItem = state.items.find(
        (item) => action.payload.id === item.id
      );
      if (findedItem) {
        findedItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    minusCartItem(state, action: PayloadAction<number>) {
      const findedItem = state.items.find((item) => action.payload === item.id);
      findedItem!.count--;
    },
    deleteCartItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const findedCartItem = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

const { reducer, actions } = cartSlice;
export const { addToCart, minusCartItem, deleteCartItem } = actions;
export default reducer;
