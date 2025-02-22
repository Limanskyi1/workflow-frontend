import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog";

import { useTaskModalLinking } from "../../../hooks/use-task-modal-linking";
import { TaskMultiSelect } from "../../task-multi-select/task-multi-select";
import { MouseEvent } from "react";

interface TaskLinkingModalProps {
  taskId: number;
  onClose: () => void;
}

export const TaskModalLinking = ({ taskId,onClose }: TaskLinkingModalProps) => {
  const {
    selectedTasks,
    handleAddTask,
    handleRemoveTask,
    handleCreateLinking,
  } = useTaskModalLinking(taskId);

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Dialog open>
      <DialogContent
        className="sm:max-w-[625px]"
        close={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Selecting a task for linking</DialogTitle>
        <DialogDescription>
          Bind tasks to link the work in a project
        </DialogDescription>
        <TaskMultiSelect
          selectedTasks={selectedTasks}
          handleAddTask={handleAddTask}
          handleRemoveTask={handleRemoveTask}
          currentTaskId={taskId}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateLinking}>Binding</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
