import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog";

import { TaskMultiSelect } from "../../task-multi-select";

interface TaskLinkingModalProps {
  onClose: () => void;
}

export const TaskLinkingModal = ({ onClose }: TaskLinkingModalProps) => {
  const handleClose = (event: React.MouseEvent) => {
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
        <TaskMultiSelect />
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button>Binding</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
