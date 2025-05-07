import { baseApi } from "@/shared/api/baseApi";

import { CreateTask, Task, UpdateTask } from "../model/types";

enum TaskStatus {
  IN_BOX = "IN_BOX",
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  WAITING = "WAITING",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

type GroupedTasks = {
  id: number;
  status: TaskStatus;
  tasks: Task[];
}[];

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GroupedTasks, { title?: string }>({
      query: ({ title }) => {
        const params = new URLSearchParams();
        if (title && title !== "") params.append("title", title);
        return `/tasks?${params.toString()}`;
      },
      providesTags: [{ type: "Task", id: "LIST" }],
      transformResponse: (tasks: Task[]): GroupedTasks => {
        return Object.values(TaskStatus).map((status, index) => ({
          id: index + 1,
          status,
          tasks: tasks.filter((task) => task.status === status),
        }));
      },
    }),
    createTask: builder.mutation({
      query: (body: CreateTask) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    editTask: builder.mutation({
      query: ({ task, id }: { task: UpdateTask; id: number }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),
    getTaskById: builder.query<Task, number>({
      query: (taskId: number) => `/tasks/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: "Task", id: taskId }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} = tasksApi;
