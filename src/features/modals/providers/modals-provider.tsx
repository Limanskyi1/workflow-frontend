import { ReactNode, createContext, useState } from "react";

import {
  TaskModalCreate,
  TaskModalDelete,
  TaskModalEdit,
  TaskModalLinking,
} from "@/modules/task";

interface ModalContextType {
  isAddTaskModalOpen: boolean;
  handleOpenAddTaskModal: () => void;
  handleCloseAddTaskModal: () => void;

  isOpenDeleteTaskModal: boolean;
  handleOpenDeleteTaskModal: (taskId: number) => void;
  handleCloseDeleteTaskModal: () => void;

  isOpenEditTaskModal: boolean;
  handleOpenEditTaskModal: (taskId: number) => void;
  handleCloseEditTaskModal: () => void;

  isOpenLinkingTaskModal: boolean;
  handleOpenLinkingTaskModal: (taskId: number) => void;
  handleCloseLinkingTaskModal: () => void;
}

export const ModalsContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  // Add task modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const handleOpenAddTaskModal = () => setIsAddTaskModalOpen(true);
  const handleCloseAddTaskModal = () => setIsAddTaskModalOpen(false);

  // Delete task modal
  const [deleteTaskModal, setDeleteTaskModal] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({
    isOpen: false,
    taskId: null,
  });

  const handleOpenDeleteTaskModal = (taskId: number) => {
    setDeleteTaskModal({ isOpen: true, taskId });
  };

  const handleCloseDeleteTaskModal = () => {
    setDeleteTaskModal({ isOpen: false, taskId: null });
  };

  // Edit task modal
  const [editTaskModal, setEditTaskModal] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({
    isOpen: false,
    taskId: null,
  });

  const handleOpenEditTaskModal = (taskId: number) => {
    setEditTaskModal({ isOpen: true, taskId });
  };

  const handleCloseEditTaskModal = () => {
    setEditTaskModal({ isOpen: false, taskId: null });
  };

  // Linking task modal
  const [linkingTaskModal, setLinkingTaskModal] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({
    isOpen: false,
    taskId: null,
  });

  const handleOpenLinkingTaskModal = (taskId: number) => {
    setLinkingTaskModal({ isOpen: true, taskId });
  };

  const handleCloseLinkingTaskModal = () => {
    setLinkingTaskModal({ isOpen: false, taskId: null });
  };

  return (
    <ModalsContext.Provider
      value={{
        isAddTaskModalOpen,
        handleOpenAddTaskModal,
        handleCloseAddTaskModal,
        isOpenDeleteTaskModal: deleteTaskModal.isOpen,
        handleOpenDeleteTaskModal,
        handleCloseDeleteTaskModal,
        isOpenEditTaskModal: editTaskModal.isOpen,
        handleOpenEditTaskModal,
        handleCloseEditTaskModal,
        isOpenLinkingTaskModal: linkingTaskModal.isOpen,
        handleOpenLinkingTaskModal,
        handleCloseLinkingTaskModal,
      }}
    >
      {children}
      {isAddTaskModalOpen && (
        <TaskModalCreate onClose={handleCloseAddTaskModal} />
      )}
      {deleteTaskModal.isOpen && (
        <TaskModalDelete
          taskId={deleteTaskModal.taskId as number}
          onClose={handleCloseDeleteTaskModal}
          onCancel={handleCloseDeleteTaskModal}
        />
      )}
      {editTaskModal.isOpen && (
        <TaskModalEdit
          onClose={handleCloseEditTaskModal}
          taskId={editTaskModal.taskId as number}
        />
      )}
      {linkingTaskModal.isOpen && (
        <TaskModalLinking
          onClose={handleCloseLinkingTaskModal}
          taskId={linkingTaskModal.taskId as number}
        />
      )}
    </ModalsContext.Provider>
  );
};
