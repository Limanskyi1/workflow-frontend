import { useCallback } from "react";

import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTasksQuery,
} from "../api/taskApi";
import { CreateTask, UpdateTask } from "../model/types";

export const useTasks = (filters?: { title: string }) => {
  const { data: tasks } = useGetTasksQuery(filters || {});
  const [editTaskMutation] = useEditTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const [createTaskMutation] = useCreateTaskMutation();
  const { toast } = useToast();

  const deleteTask = async (taskId: number) => {
    try {
      await deleteTaskMutation(taskId);
      toast(TOAST_CONFIG.deleteTaskSuccess);
    } catch (error) {
      console.error("Error deleting task", error);
      toast(TOAST_CONFIG.deleteTaskWithError);
    }
  };

  const editTask = async (taskId: number, data: UpdateTask) => {
    try {
      await editTaskMutation({
        task: data,
        id: taskId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (data: CreateTask) => {
    try {
      await createTaskMutation(data as CreateTask).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    tasks,
    deleteTask: useCallback(deleteTask, []),
    createTask: useCallback(createTask, []),
    editTask: useCallback(editTask, []),
  };
};
