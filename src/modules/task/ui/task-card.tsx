import { Badge } from "@/shared/ui/badge";
import { Card, CardDescription, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../consts/priority-colors";
import { useTaskCard } from "../hooks/use-task-card";
import { TaskPriority } from "../model/types/task-priority";
import { convertPriorityToText } from "../utils/convert-priority-to-text";
import { DeleteTaskModal } from "./delete-task-modal/delete-task-modal";
import { TrashTaskBadge } from "./trash-task-badge/trash-task-badge";

interface TaskCardProps {
  title: string;
  description: string;
  priority: TaskPriority;
  id: number;
}

export const TaskCard = ({
  title,
  description,
  priority,
  id,
}: TaskCardProps) => {
  const {
    isTrashVisible,
    isDelititeModalOpen,
    setIsTrashVisible,
    onMouseEnterTask,
    onMouseLeaveTask,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTask,
  } = useTaskCard(id);
  return (
    <Card
      className="p-3 cursor-pointer"
      onMouseEnter={onMouseEnterTask}
      onMouseLeave={onMouseLeaveTask}
    >
      <div className="flex items-center justify-between mb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TrashTaskBadge
          isTrashVisible={isTrashVisible}
          setIsTrashVisible={setIsTrashVisible}
          onClick={handleOpenDeleteModal}
        />
      </div>
      <CardDescription className="text-sm p-0 mb-2">
        {description}
      </CardDescription>
      <Badge variant="secondary" className={priorityColors[priority]}>
        {convertPriorityToText(priority)}
      </Badge>
      <DeleteTaskModal
        isOpen={isDelititeModalOpen}
        close={handleCloseDeleteModal}
        taskId={id}
        onDelete={handleDeleteTask}
        onCancel={handleCloseDeleteModal}
      />
    </Card>
  );
};
