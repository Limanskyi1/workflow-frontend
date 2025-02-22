import { useState } from "react";

export const useTaskModalLinking = (taskId: number) => {
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);

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

  const handleCreateLinking = () => {
    const taskIds = selectedTasks.map((task) => task.id);
    console.log([taskId, ...taskIds]);
    return [taskId, ...taskIds];
  };

  return {
    selectedTasks,
    handleAddTask,
    handleRemoveTask,
    handleCreateLinking,
  };
};
