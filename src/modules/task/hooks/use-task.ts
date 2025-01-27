import { TOAST_CONFIG, useToast } from "@/features/toast";

import { useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation } from "../api/taskApi";
import { CreateTask } from "../model/types/create-task";
import { UpdateTask } from "../model/types/update-task";

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

  const handleEditTask = async (data:UpdateTask) => {
    if(!taskId){
      throw new Error("Task id is undefined");
    }
    const resp = {
      task:data,
      id:taskId,
    }
    console.log(resp);
    try {
      const task = await editTask(resp).unwrap();
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  }

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
      const task = await createTask(dataToSend).unwrap();
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleDeleteTask,
    handleCreateTask,
    handleEditTask,
  };
};
