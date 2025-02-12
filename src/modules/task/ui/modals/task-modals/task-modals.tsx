import { TaskLinkingModal } from "../task-linking-modal/task-linking-modal";
import { TaskModalDelete } from "../task-modal-delete/task-modal-delete";
import { TaskModalEdit } from "../task-modal-edit/task-modal-edit";

interface TaskModalsProps {
  id: number;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isLinkingModalOpen: boolean;
  handleCloseDeleteModal: () => void;
  handleCloseEditModal: () => void;
  handleCloseLinkingModal: () => void;
}

export const TaskModals = (props: TaskModalsProps) => {
  const {
    id,
    isDeleteModalOpen,
    isEditModalOpen,
    isLinkingModalOpen,
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseLinkingModal,
  } = props;

  return (
    <>
      {isDeleteModalOpen && (
        <TaskModalDelete
          taskId={id}
          onClose={handleCloseDeleteModal}
          onCancel={handleCloseDeleteModal}
        />
      )}
      {isEditModalOpen && (
        <TaskModalEdit onClose={handleCloseEditModal} taskId={id} />
      )}
      {isLinkingModalOpen && (
        <TaskLinkingModal onClose={handleCloseLinkingModal} />
      )}
    </>
  );
};
