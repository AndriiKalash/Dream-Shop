import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "./type";
import { RootState } from "../store";

const initialState: IFilters = {
  searchValue: "",
  searchMoreGoods: false,
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
  },
});

export const filterSelector = (state: RootState) => state.filtersSlice;

const { reducer, actions } = filtersSlice;
export const { setSearchValue, serachMore } = actions;
export default reducer;
