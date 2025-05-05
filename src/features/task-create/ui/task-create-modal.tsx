import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { useTask } from "../../../entities/task/hooks/use-task";
import { taskFormValuesDefault } from "../../../modules/task/consts/task-form-values-default";
import { TaskForm } from "../../../modules/task/ui/task-form/task-form";

interface TaskCreateModalProps {
  onClose: () => void;
}

export const TaskCreateModal = ({ onClose }: TaskCreateModalProps) => {
  const { handleCreateTask } = useTask();
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[625px]" close={handleClose}>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>
        <TaskForm
          mode="create"
          defaultValues={taskFormValuesDefault}
          onSubmit={handleCreateTask}
          callbackAfterSubmit={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
