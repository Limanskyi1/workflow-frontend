import { TaskForm } from "@/entities/task";
import { useTasks } from "@/entities/task";
import { UpdateTask } from "@/entities/task/model/types";
import { useGetTaskByIdQuery } from "@/shared/api/tasks/tasks-api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

interface TaskEditModalProps {
  taskId: number;
  onClose: () => void;
}

export const TaskEditModal = ({ taskId, onClose }: TaskEditModalProps) => {
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId);
  const { editTask } = useTasks();

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[625px]" close={handleClose}>
        {isLoading ? (
          <TaskEditModal.Loader />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Task #{taskId}</DialogTitle>
            </DialogHeader>
            <TaskForm
              defaultValues={{
                title: task?.title,
                description: task?.description,
                status: task?.status,
                priority: task?.priority,
                dueDate: task?.dueDate,
              }}
              onSubmit={async (data) => {
                const task: UpdateTask = {
                  title: data.title,
                  description: data.description,
                  status: data.status || "TO_DO",
                  priority: data.priority || "LOW",
                  dueDate: data.dueDate,
                };
                editTask(taskId, task);
                onClose();
              }}
              button={
                <Button className="w-fit ml-auto" type="submit">
                  Update
                </Button>
              }
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

TaskEditModal.Loader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[20px] mt-2 w-[50%]" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-[20%]" />
        <Skeleton className="h-[30px] w-[100%]" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-[20%]" />
        <Skeleton className="h-[30px] w-[100%]" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-[20%]" />
        <Skeleton className="h-[30px] w-[100%]" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-[20%]" />
        <Skeleton className="h-[30px] w-[100%]" />
      </div>
      <Skeleton className="h-[30px] w-[100%]" />
      <Skeleton className="h-[30px] w-[20%] ml-auto" />
    </div>
  );
};
