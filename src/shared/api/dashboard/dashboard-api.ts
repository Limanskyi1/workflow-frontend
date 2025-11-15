import { Dashboard, UpdateDashboard } from "@/entities/dashboard/model/types";
import { baseApi } from "@/shared/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDashboard: builder.query<Dashboard, void>({
      query: () => "/boards/my",
      providesTags: ["Dashboard"],
    }),
    updateDashboard: builder.mutation({
      query: ({ data, id }: { data: UpdateDashboard; id: number }) => ({
        url: `/boards/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});
export const { useGetMyDashboardQuery, useUpdateDashboardMutation } =
  dashboardApi;
