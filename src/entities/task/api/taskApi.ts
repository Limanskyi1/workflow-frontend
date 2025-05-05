import { baseApi } from "@/shared/api/baseApi";

import { CreateTask, Task, UpdateTask } from "../model/types";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body: CreateTask) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dashboard", "Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (taskId: number) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard", "Tasks"],
    }),
    editTask: builder.mutation({
      query: ({ task, id }: { task: UpdateTask; id: number }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
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
