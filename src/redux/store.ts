import { configureStore } from "@reduxjs/toolkit";
import shopItems from "./shopItems/slice";
import cart from "./cart/slice";
export const store = configureStore({
  reducer: {
    shopItems,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
