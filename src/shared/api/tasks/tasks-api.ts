import { Task } from "@/entities/task";
import { CreateTask, TaskActivity, UpdateTask } from "@/entities/task/model/types";
import { baseApi } from "@/shared/api/baseApi";

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
    getActivities: builder.query<TaskActivity[], void>({
      query: () => "/tasks/activities",
      providesTags: [{ type: "TaskActivity", id: "LIST" }],
    }),
    deleteActivities: builder.mutation<void, void>({
      query: () => ({
        url: "/tasks/activities",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TaskActivity", id: "LIST" }],
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
    deleteTaskActivity: builder.mutation<void, number>({
      query: (activityId) => ({
        url: `/tasks/activities/${activityId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TaskActivity", id: "LIST" }],
    }),
    editTask: builder.mutation({
      query: ({ task, id }: { task: UpdateTask; id: number }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),
    getTaskById: builder.query<Task, number>({
      query: (taskId: number) => `/tasks/${taskId}`,
      providesTags: (_, __, taskId) => [{ type: "Task", id: taskId }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetActivitiesQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useDeleteTaskActivityMutation,
  useDeleteActivitiesMutation,
  useGetTaskByIdQuery,
} = tasksApi;
