import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { taskFormValuesDefault } from "../../consts/task-form-values-default";
import { useTask } from "../../hooks/use-task";
import { TaskForm } from "../task-form/task-form";

interface TaskModalCreateProps {
  onClose: () => void;
}

export const TaskModalCreate = ({ onClose }: TaskModalCreateProps) => {
  const { handleCreateTask } = useTask();

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" close={handleClose}>
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
