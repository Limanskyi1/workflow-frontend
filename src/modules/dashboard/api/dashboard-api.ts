import { baseApi } from "@/shared/api/baseApi";

import { Dashboard } from "../model/types/dashboard";
import { UpdateDashboard } from "../model/types/update-dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDashboard: builder.query<Dashboard, void>({
      query: () => "/boards/my",
      providesTags: ["Dashboard"],
    }),
    updateDashboard: builder.mutation<Dashboard, UpdateDashboard>({
      query: (body: UpdateDashboard) => ({
        url: `/boards/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});
export const { useGetMyDashboardQuery, useUpdateDashboardMutation } =
  dashboardApi;
