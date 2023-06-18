import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IShopItems, IShopItem, StatusShopItems } from "./type";
import { RootState } from "../store";

export const fetchShopItems = createAsyncThunk<IShopItem[]>(
  "shopItems/fetchShopItems",
  async () => {
    const { data } = await axios.get("shopItems.json");
    return data;
  }
);

const initialState: IShopItems = {
  items: [],
  status: StatusShopItems.LOADING,
};

const shopItemsSlice = createSlice({
  name: "shopItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.items = [];
        state.status = StatusShopItems.LOADING;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = StatusShopItems.IDLE;
      })
      .addCase(fetchShopItems.rejected, (state) => {
        state.items = [];
        state.status = StatusShopItems.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export const shopItemsSelector = (state: RootState) => state.shopItems;

const { reducer, actions } = shopItemsSlice;

export default reducer;
