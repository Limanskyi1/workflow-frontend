import { TaskForm, useTasks } from "@/entities/task";
import { CreateTask } from "@/entities/task/model/types";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface TaskCreateModalProps {
  onClose: () => void;
}

export const TaskCreateModal = ({ onClose }: TaskCreateModalProps) => {
  const { createTask } = useTasks();

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
          onSubmit={async (data) => {
            const task: CreateTask = {
              title: data.title,
              description: data.description,
              status: data.status || "TO_DO",
              priority: data.priority || "LOW",
              dueDate: data.dueDate,
            };
            createTask(task);
            onClose();
          }}
          button={
            <Button className="w-fit ml-auto" type="submit">
              Create
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
