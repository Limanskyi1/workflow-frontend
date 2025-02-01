import { useModal } from "@/shared/hooks/use-modal";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Badge } from "@/shared/ui/badge";
import { Card, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../../consts/priority-colors";
import { useTask } from "../../hooks/use-task";
import { TaskPriority } from "../../model/types/task-priority";
import { convertPriorityToText } from "../../utils/convert-priority-to-text";
import { TaskDateBadge } from "../task-date-badge/task-date-badge";
import { TaskModalDelete } from "../task-modal-delete/task-modal-delete";
import { TaskModalEdit } from "../task-modal-edit/task-modal-edit";
import { TaskTrashBadge } from "../task-trash-badge/task-trash-badge";

interface TaskCardProps {
  title: string;
  priority: TaskPriority;
  id: number;
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
    isVisible: isTrashVisible,
    show: showTrash,
    hide: hideTrash,
    toggle: toggleTrash,
  } = useVisibility();

  const { handleDeleteTask } = useTask(id);

  return (
    <Card
      className="p-3 cursor-pointer flex flex-col"
      onMouseEnter={showTrash}
      onMouseLeave={hideTrash}
      onClick={handleOpenEditModal}
    >
      <div className="flex items-center justify-between mb-2">
        <CardTitle className="text-sm font-extrabold">{title}</CardTitle>
        <TaskTrashBadge
          isTrashVisible={isTrashVisible}
          setIsTrashVisible={toggleTrash}
          onClick={handleOpenDeleteModal}
        />
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
    </Card>
  );
};
