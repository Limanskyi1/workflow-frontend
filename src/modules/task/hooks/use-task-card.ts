import { useState } from "react";

import { TOAST_CONFIG, useToast } from "@/features/toast";

import { useDeleteTaskMutation } from "../api/taskApi";

export const useTaskCard = (taskId: number) => {
  const [isTrashVisible, setIsTrashVisible] = useState(false);
  const [isDelititeModalOpen, setIsDelititeModalOpen] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const { toast } = useToast();

  const onMouseEnterTask = () => {
    setIsTrashVisible(true);
  };

  const onMouseLeaveTask = () => {
    setIsTrashVisible(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDelititeModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDelititeModalOpen(false);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId);
      toast(TOAST_CONFIG.deleteTaskSuccess);
    } catch (error) {
      console.error("Error deleting task", error);
      toast(TOAST_CONFIG.deleteTaskWithError);
    }
  };

  return {
    isTrashVisible,
    isDelititeModalOpen,
    setIsTrashVisible,
    onMouseEnterTask,
    onMouseLeaveTask,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTask,
  };
};
