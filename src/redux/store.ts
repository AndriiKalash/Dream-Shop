import { configureStore } from "@reduxjs/toolkit";
import shopItems from "./shopItems/slice";

export const store = configureStore({
  reducer: {
    shopItems,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
