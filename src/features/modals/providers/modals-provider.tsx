import { ReactNode, createContext, useState } from "react";

import {
  TaskModalCreate,
  TaskModalDelete,
  TaskModalEdit,
} from "@/modules/task";
import { useModalState } from "../hooks/use-modal-state";

interface ModalContextType {
  isAddTaskModalOpen: boolean;
  handleOpenAddTaskModal: () => void;
  handleCloseAddTaskModal: () => void;

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
  const handleOpenAddTaskModal = () => setIsAddTaskModalOpen(true);
  const handleCloseAddTaskModal = () => setIsAddTaskModalOpen(false);

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
        handleOpenAddTaskModal,
        handleCloseAddTaskModal,
        isOpenDeleteTaskModal: deleteTaskModal.isOpen,
        openDeleteTaskModal,
        closeDeleteTaskModal,
        isOpenEditTaskModal: editTaskModal.isOpen,
        openEditTaskModal,
        closeEditTaskModal,
      }}
    >
      {children}
      {isAddTaskModalOpen && (
        <TaskModalCreate onClose={handleCloseAddTaskModal} />
      )}
      {deleteTaskModal.isOpen && (
        <TaskModalDelete
          taskId={deleteTaskModal.taskId as number}
          onClose={closeDeleteTaskModal}
          onCancel={closeDeleteTaskModal}
        />
      )}
      {editTaskModal.isOpen && (
        <TaskModalEdit
          onClose={closeEditTaskModal}
          taskId={editTaskModal.taskId as number}
        />
      )}
    </ModalsContext.Provider>
  );
};
