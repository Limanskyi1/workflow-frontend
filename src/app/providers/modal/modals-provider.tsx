import { ReactNode, createContext, useState } from "react";

import {
  TaskCreateModal,
  TaskDeleteModal,
  TaskEditModal,
} from "@/features/task";

import { useModalState } from "./hooks/use-modal-state";

interface ModalContextType {
  isAddTaskModalOpen: boolean;
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;

  isOpenDeleteTaskModal: boolean;
  openDeleteTaskModal: (taskId: number) => void;
  closeDeleteTaskModal: () => void;

  isOpenEditTaskModal: boolean;
  openEditTaskModal: (taskId: number) => void;
  closeEditTaskModal: () => void;
}

export const ModalsContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  // Add task modal
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const openAddTaskModal = () => setIsAddTaskModalOpen(true);
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  // Delete task modal
  const {
    modalState: deleteTaskModal,
    open: openDeleteTaskModal,
    close: closeDeleteTaskModal,
  } = useModalState();

  // Edit task modal
  const {
    modalState: editTaskModal,
    open: openEditTaskModal,
    close: closeEditTaskModal,
  } = useModalState();

  return (
    <ModalsContext.Provider
      value={{
        isAddTaskModalOpen,
        openAddTaskModal,
        closeAddTaskModal,
        isOpenDeleteTaskModal: deleteTaskModal.isOpen,
        openDeleteTaskModal,
        closeDeleteTaskModal,
        isOpenEditTaskModal: editTaskModal.isOpen,
        openEditTaskModal,
        closeEditTaskModal,
      }}
    >
      {children}
      {isAddTaskModalOpen && <TaskCreateModal onClose={closeAddTaskModal} />}
      {deleteTaskModal.isOpen && (
        <TaskDeleteModal
          taskId={deleteTaskModal.taskId as number}
          onClose={closeDeleteTaskModal}
          onCancel={closeDeleteTaskModal}
        />
      )}
      {editTaskModal.isOpen && (
        <TaskEditModal
          onClose={closeEditTaskModal}
          taskId={editTaskModal.taskId as number}
        />
      )}
    </ModalsContext.Provider>
  );
};
