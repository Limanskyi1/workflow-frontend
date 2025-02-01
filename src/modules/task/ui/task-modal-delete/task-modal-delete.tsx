import { DialogDescription } from "@radix-ui/react-dialog";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface TaskModalDeleteProps {
  taskId: number;
  onClose: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const TaskModalDelete = ({
  taskId,
  onClose,
  onDelete,
  onCancel,
}: TaskModalDeleteProps) => {
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    onCancel();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" close={handleClose}>
        <DialogHeader>
          <DialogTitle>Deleting a task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this task #{taskId}?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
