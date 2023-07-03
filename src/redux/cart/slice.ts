import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICartItem, ICartItems } from "../cart/type";
import { getItemsFromLS } from "../../utils/getItemsFromLS";
import { getTotalCount, getTotalPrice } from "../../utils/getTotal";

const { items, totalCount, totalPrice } = getItemsFromLS();
const initialState: ICartItems = {
  items,
  totalCount,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const findedItem = state.items.find(
        (item) => action.payload.id === item.id
      );
      if (findedItem?.count) {
        findedItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
    minusCartItem(state, action: PayloadAction<number>) {
      const findedItem = state.items.find((item) => action.payload === item.id);
      if (findedItem?.count) {
        findedItem.count--;
      }
      state.totalCount--;
      state.totalPrice = getTotalPrice(state.items);
    },
    deleteCartItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalCount = getTotalCount(state.items);
      state.totalPrice = getTotalPrice(state.items);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const findedCartItem = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

const { reducer, actions } = cartSlice;
export const { addToCart, minusCartItem, deleteCartItem } = actions;
export default reducer;
