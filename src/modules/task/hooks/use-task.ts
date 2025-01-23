import { TOAST_CONFIG, useToast } from "@/features/toast";

import { useCreateTaskMutation, useDeleteTaskMutation } from "../api/taskApi";
import { CreateTask } from "../model/types/create-task";

export const useTask = (taskId?: number) => {
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
    handleDeleteTask,
    handleCreateTask,
  };
};
