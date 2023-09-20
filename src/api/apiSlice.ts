import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IShopItem } from '../redux/filters/type';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63f695a3ab76703b15c1c124.mockapi.io',
  }),
  refetchOnFocus: true,
  tagTypes: ['Goods'],
  endpoints: (builder) => ({
    getGoods: builder.query<IShopItem[], { search: string; page?: number }>({
      query: ({ search, page }) =>
        page
          ? `/items?title=${search}&page=${page}&limit=8`
          : `/items?title=${search}`,
      providesTags: ['Goods'],
    }),
    getItem: builder.query<IShopItem, number>({
      query: (id) => `/items/${id}`,
      providesTags: ['Goods'],
    }),
  }),
});

export const { useGetGoodsQuery, useGetItemQuery } = apiSlice;
