import { createApi } from "@reduxjs/toolkit/query/react";

import { dashboardApi } from "@/modules/dashboard";
import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";

import { CreateTask, Task, UpdateTask } from "../model/types";

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
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        "Dashboard",
        "Tasks",
      ],
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
    getAllWithoutRelations: builder.query<Pick<Task, "id" | "title">[], void>({
      query: () => `/tasks/without-relations`,
      transformResponse: (res: Task[]) =>
        res.map((task) => {
          return {
            id: task.id,
            title: task.title,
          };
        }),
    }),
    getRelatedTasks: builder.query<Task[], number>({
      query: (taskId: number) => `/tasks/${taskId}/related`,
      providesTags: (result, error, taskId) => [{ type: "Task", id: taskId }],
    }),
    createTasksRelation: builder.mutation({
      query: (taskIds: Task["id"][]) => ({
        url: "/task-relations",
        method: "POST",
        body: { taskIds },
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
  }),
});

export const {
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useGetAllWithoutRelationsQuery,
  useGetRelatedTasksQuery,
  useCreateTasksRelationMutation,
} = tasksApi;
