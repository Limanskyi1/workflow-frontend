import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface TaskLinkingModalProps {
  onClose: () => void;
}

export const TaskLinkingModal = ({onClose}: TaskLinkingModalProps) => {

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" close={handleClose} onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Selecting a task for linking</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Bind tasks to link the work in a project
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button disabled>Binding</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
