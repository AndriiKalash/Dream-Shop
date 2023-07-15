import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "./type";
import { RootState } from "../store";

const initialState: IFilters = {
  searchValue: "",
  searchMoreGoods: false,
  priceValue: [0, 100],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    serachMore(state, action: PayloadAction<boolean>) {
      state.searchMoreGoods = action.payload;
    },
    setPriceValue(state, action: PayloadAction<number[]>) {
      state.priceValue = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filtersSlice;

const { reducer, actions } = filtersSlice;
export const { setSearchValue, serachMore, setPriceValue } = actions;
export default reducer;
