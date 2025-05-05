import { useCallback } from "react";

import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";
import { CreateTask, UpdateTask } from "../model/types";
import { useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation } from "@/entities/task/api/taskApi";

export const useTask = (taskId?: number) => {
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const { toast } = useToast();

  const handleDeleteTask = async () => {
    if (!taskId) {
      throw new Error("Task id is undefined");
    }
    try {
      await deleteTask(taskId);
      toast(TOAST_CONFIG.deleteTaskSuccess);
    } catch (error) {
      console.error("Error deleting task", error);
      toast(TOAST_CONFIG.deleteTaskWithError);
    }
  };

  const handleEditTask = async (data: UpdateTask) => {
    if (!taskId) {
      throw new Error("Task id is undefined");
    }
    const resp = {
      task: data,
      id: taskId,
    };
    
    try {
      const task = await editTask(resp).unwrap();
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async (data: CreateTask) => {
    const { title, description, status, priority, dueDate } = data;
    const dataToSend: CreateTask = {
      title,
      description,
      status: status,
      priority: priority,
      dueDate,
    };
    try {
      await createTask(dataToSend).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleDeleteTask: useCallback(handleDeleteTask, [taskId]),
    handleCreateTask: useCallback(handleCreateTask, []),
    handleEditTask: useCallback(handleEditTask, [taskId]),
  };
};
