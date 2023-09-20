import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filters/slice';
import cart from './cart/slice';
import { apiSlice } from '../api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    filtersSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors

setupListeners(store.dispatch);
