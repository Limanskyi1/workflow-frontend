import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";

import { CreateTask } from "../model/types/create-task";
import { dashboardApi } from "@/modules/dashboard/api/dashboard-api";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "Tasks"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body: CreateTask) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dashboard", "Tasks"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
        } catch (error) {
          console.error("Error creating task", error);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (taskId: number) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard", "Tasks"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
        } catch (error) {
          console.error("Error creating task", error);
        }
      },
    })
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation } = tasksApi;
