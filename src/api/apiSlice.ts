import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShopItem } from "../redux/shopItems/type";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://63f695a3ab76703b15c1c124.mockapi.io",
  }),
  //   tagTypes: ["Goods"],
  endpoints: (builder) => ({
    getGoods: builder.query<IShopItem[], string>({
      query: (search) => `/items?title=${search}`,
      //   providesTags: ["Goods"],
    }),
    // createHero: builder.mutation({
    //   query: (hero) => ({
    //     url: "/heroes",
    //     method: "POST",
    //     body: hero,
    //   }),
    //   invalidatesTags: ["Goods"],
    // }),
    // deleteHero: builder.mutation({
    //   query: (id) => ({
    //     url: `/heroes/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Goods"],
    // }),
    // addTask: builder.mutation({
    //   query: ({ heroId, task }) => ({
    //     url: `/heroes/${heroId}`,
    //     method: "PATCH",
    //     body: { task },
    //   }),
    //   invalidatesTags: ["Goods"],
    // }),
  }),
});

export const {
  useGetGoodsQuery,
  //   useCreateHeroMutation,
  //   useDeleteHeroMutation,
  //   useAddTaskMutation,
} = apiSlice;
