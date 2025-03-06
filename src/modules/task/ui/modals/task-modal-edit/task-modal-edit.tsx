import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

import { useGetTaskByIdQuery } from "../../../api/taskApi";
import { taskPriorities } from "../../../consts/task-priorities";
import { taskStatuses } from "../../../consts/task-statuses";
import { useTask } from "../../../hooks/use-task";
import { TaskForm } from "../../task-form/task-form";
import { RelatedTasks } from "./related-tasks";

interface TaskModalEditProps {
  taskId: number;
  onClose: () => void;
}

export const TaskModalEdit = ({ taskId, onClose }: TaskModalEditProps) => {
  const { data: task, isLoading } = useGetTaskByIdQuery(taskId);
  const { handleEditTask } = useTask(taskId);
  const [mode, setMode] = useState<"edit" | "related">("edit");

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const defaultValues = {
    title: task?.title,
    description: task?.description,
    status: taskStatuses.find((status) => status.value === task?.status),
    priority: taskPriorities.find(
      (priority) => priority.value === task?.priority,
    ),
    dueDate: task?.dueDate,
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[625px]" close={handleClose}>
        {isLoading ? (
          <TaskModalEdit.Loader />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Task #{taskId}</DialogTitle>
            </DialogHeader>
            {mode === "edit" ? (
              <>
                <TaskForm
                  mode="edit"
                  defaultValues={defaultValues}
                  onSubmit={handleEditTask}
                  callbackAfterSubmit={onClose}
                />
              </>
            ) : (
              <RelatedTasks taskId={taskId} />
            )}
          </>
        )}
        {mode === "edit" ? (
          <Button
            onClick={() => setMode("related")}
            variant="ghost"
            className="w-fit ml-auto"
          >
            Show related tasks
          </Button>
        ) : (
          <Button
            onClick={() => setMode("edit")}
            variant="ghost"
            className="w-fit ml-auto"
          >
            Back to edit
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

TaskModalEdit.Loader = () => {
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
