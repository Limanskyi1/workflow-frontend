import { useModal } from "@/shared/hooks/use-modal";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../../consts/priority-colors";
import { useTask } from "../../hooks/use-task";
import { TaskPriority } from "../../model/types/task-priority";
import { convertPriorityToText } from "../../utils/convert-priority-to-text";
import { TaskActionsMenu } from "../task-actions-menu";
import { TaskDateBadge } from "../task-date-badge/task-date-badge";
import { TaskLinkingModal } from "../task-linking-modal";
import { TaskModalDelete } from "../task-modal-delete/task-modal-delete";
import { TaskModalEdit } from "../task-modal-edit/task-modal-edit";
import { TaskTrashBadge } from "../task-trash-badge/task-trash-badge";

interface TaskCardProps {
  id: number;
  title: string;
  priority: TaskPriority;
  dueDate?: Date;
}

export const TaskCard = ({ title, priority, id, dueDate }: TaskCardProps) => {
  const {
    isOpen: isDeleteModalOpen,
    open: handleOpenDeleteModal,
    close: handleCloseDeleteModal,
  } = useModal();

  const {
    isOpen: isEditModalOpen,
    open: handleOpenEditModal,
    close: handleCloseEditModal,
  } = useModal();

  const {
    isOpen: isLinkingModalOpen,
    open: handleOpenLinkingModal,
    close: handleCloseLinkingModal,
  } = useModal();

  const {
    isVisible: isButtonsVisible,
    show: showButtons,
    hide: hideButtons,
    toggle: toggleButtons,
  } = useVisibility();

  const {
    isVisible: isActionsVisible,
    hide: hideActions,
    toggle: toggleActions,
  } = useVisibility();

  const { handleDeleteTask } = useTask(id);

  const hideAll = () => {
    hideButtons();
    hideActions();
  };

  return (
    <Card
      className="p-3 cursor-pointer flex flex-col hover:bg-accent/40 transition ease-in-out"
      onMouseEnter={showButtons}
      onMouseLeave={hideAll}
      onClick={(event) => handleOpenEditModal(event)}
    >
      <div className="flex items-center justify-between mb-2">
        <CardTitle className="text-sm font-extrabold">{title}</CardTitle>
        <div
          className={`flex gap-2 ${isButtonsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <TaskActionsMenu
            isOpen={isActionsVisible}
            setIsOpen={toggleActions}
            onClickDelete={handleOpenDeleteModal}
            onClickLink={handleOpenLinkingModal}
            hideAll={hideAll}
          />
          <TaskTrashBadge
            setIsTrashVisible={toggleButtons}
            onClick={handleOpenDeleteModal}
          />
        </div>
      </div>
      {dueDate && <TaskDateBadge taskDueDate={dueDate} />}
      <Badge
        variant="secondary"
        className={`${priorityColors[priority]} w-fit`}
      >
        {convertPriorityToText(priority)}
      </Badge>
      {isDeleteModalOpen && (
        <TaskModalDelete
          taskId={id}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteTask}
          onCancel={handleCloseDeleteModal}
        />
      )}
      {isEditModalOpen && (
        <TaskModalEdit onClose={handleCloseEditModal} taskId={id} />
      )}
      {isLinkingModalOpen && (
        <TaskLinkingModal onClose={handleCloseLinkingModal} />
      )}
    </Card>
  );
};
