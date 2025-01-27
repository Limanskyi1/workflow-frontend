import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { useGetTaskByIdQuery } from "../../api/taskApi";
import { taskPriorities } from "../../consts/task-priorities";
import { taskStatuses } from "../../consts/task-statuses";
import { useTask } from "../../hooks/use-task";
import { TaskForm } from "../task-form/task-form";

interface TaskModalEditProps {
  taskId: number;
  onClose: () => void;
}

export const TaskModalEdit = ({ taskId, onClose }: TaskModalEditProps) => {
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId);
  const { handleEditTask } = useTask(taskId);

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  if (isLoading) {
    return null;
  }

  const defaultValues = {
    title: task?.title,
    description: task?.description,
    status: taskStatuses.find((status) => status.value === task?.status),
    priority: taskPriorities.find(
      (priority) => priority.value === task?.priority,
    ),
    dueDate: task?.dueDate,
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" close={handleClose}>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={defaultValues}
          onSubmit={handleEditTask}
          callbackAfterSubmit={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
