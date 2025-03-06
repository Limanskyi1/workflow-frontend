import { MouseEvent } from "react";

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

interface TaskLinkingModalProps {
  taskId: number;
  onClose: () => void;
}

export const TaskModalLinking = ({
  taskId,
  onClose,
}: TaskLinkingModalProps) => {
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
        <DialogTitle>
          Select tasks for linking with the task #{taskId}
        </DialogTitle>
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
          <Button
            onClick={async () => {
              const isCreated = await handleCreateLinking();
              if (isCreated) {
                onClose();
              }
            }}
          >
            Binding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
