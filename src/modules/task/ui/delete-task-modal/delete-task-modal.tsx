import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DeleteTaskModalProps {
  taskId: number;
  isOpen: boolean;
  close: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteTaskModal = ({taskId, isOpen, close ,onDelete,onCancel}: DeleteTaskModalProps) => {

  const handleDeleteTask = () => {
    onDelete();
    close();
  };

  if(!isOpen){
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" close={close}>
        <DialogHeader>
          <DialogTitle>Deleting a task</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to delete this task #{taskId}?</DialogDescription>
        <DialogFooter>
            <Button onClick={onCancel}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteTask}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
