import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IShopItems, IShopItem, StatusShop } from "./type";
import { RootState } from "../store";

export const fetchShopItems = createAsyncThunk<IShopItem[], string | undefined>(
  "shopItems/fetchShopItems",
  async (search) => {
    const { data } = await axios.get(
      `https://63f695a3ab76703b15c1c124.mockapi.io/items?title=${search}`
    );
    return data;
  }
);

const initialState: IShopItems = {
  items: [],
  status: StatusShop.LOADING,
};

const shopItemsSlice = createSlice({
  name: "shopItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.items = [];
        state.status = StatusShop.LOADING;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = StatusShop.IDLE;
      })
      .addCase(fetchShopItems.rejected, (state) => {
        state.items = [];
        state.status = StatusShop.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export const shopItemsSelector = (state: RootState) => state.shopItems;

const { reducer, actions } = shopItemsSlice;

export default reducer;
