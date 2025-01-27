import { createApi } from "@reduxjs/toolkit/query/react";

import { dashboardApi } from "@/modules/dashboard";
import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";

import { CreateTask } from "../model/types/create-task";
import { Task } from "../model/types/task";
import { UpdateTask } from "../model/types/update-task";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "Tasks", "Task"],
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
        } catch (error) {
          console.error("Error creating task", error);
        }
      },
    }),
    editTask: builder.mutation({
      query: ({ task, id }: { task: UpdateTask; id: number }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }, "Dashboard", "Tasks"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
        } catch (error) {
          console.error("Error creating task", error);
        }
      },
    }),
    getTaskById: builder.query<Task, number>({
      query: (taskId: number) => `/tasks/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: "Task", id: taskId }],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} = tasksApi;
