import { useState } from "react";

import { TOAST_CONFIG, useToast } from "@/features/toast";

import { useCreateTasksRelationMutation } from "../api/taskApi";
import { Task } from "../model/types";

export const useTaskModalLinking = (taskId: number) => {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [createTasksRelation] = useCreateTasksRelationMutation();
  const { toast } = useToast();

  const handleAddTask = (task: any) => {
    if (!selectedTasks.some((t) => t.id === task.id)) {
      setSelectedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleRemoveTask = (taskId: number) => {
    setSelectedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId),
    );
  };

  const handleCreateLinking = async () => {
    const taskIds = selectedTasks.map((task) => task.id);
    try {
      await createTasksRelation([taskId, ...taskIds]);
      toast(TOAST_CONFIG.linkTasksSuccess);
      return true;
    } catch (error) {
      console.error("Failed to create linking", error);
      toast(TOAST_CONFIG.linkTasksWithError);
      return false;
    }
  };

  return {
    selectedTasks,
    handleAddTask,
    handleRemoveTask,
    handleCreateLinking,
  };
};
