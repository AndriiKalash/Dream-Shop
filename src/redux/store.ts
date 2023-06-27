import { configureStore } from "@reduxjs/toolkit";
import shopItems from "./shopItems/slice";
import cart from "./cart/slice";
import { apiSlice } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    shopItems,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
