import { useTask } from "@/entities/task";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface TaskDeleteModalProps {
  taskId: number;
  onClose: () => void;
  onCancel: () => void;
}

export const TaskDeleteModal = ({
  taskId,
  onClose,
  onCancel,
}: TaskDeleteModalProps) => {
  const { handleDeleteTask } = useTask(taskId);

  const handleClose = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    onClose();
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    onCancel();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleDeleteTask();
    handleClose();
  };

  return (
    <Dialog open>
      <DialogContent
        className="sm:max-w-[425px]"
        close={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
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
