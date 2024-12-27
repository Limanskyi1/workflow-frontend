import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";

import { Dashboard } from "../model/types/dashboard";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getMyDashboard: builder.query<Dashboard, void>({
      query: () => "/boards/my",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetMyDashboardQuery } = dashboardApi;
