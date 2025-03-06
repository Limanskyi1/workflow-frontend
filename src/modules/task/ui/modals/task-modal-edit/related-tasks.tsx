import { Check } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

import { useGetRelatedTasksQuery } from "../../../api/taskApi";
import { taskPriorities } from "../../../consts/task-priorities";
import { taskStatuses } from "../../../consts/task-statuses";
import { TaskPriority, TaskStatus } from "../../../model/types";

interface RelatedTasksProps {
  taskId: number;
}

export const RelatedTasks = ({ taskId }: RelatedTasksProps) => {
  const { data: tasks = [], isLoading } = useGetRelatedTasksQuery(taskId);

  const getPriorityIcon = (priority: TaskPriority) => {
    const priorityIcon = taskPriorities.find((p) => p.value === priority)?.icon;
    return priorityIcon;
  };

  const getStatusText = (status: TaskStatus) => {
    const text = taskStatuses.find((s) => s.value === status)?.label;
    return text;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return <p>No related tasks :(</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 px-4 py-2 rounded-sm border border-primary/10"
          >
            <div className="border border-primary/40 p-1 rounded-md [&_svg]:size-3">
              <Check fill="primary" />
            </div>
            <span>#{task.id}</span>
            <p>{task.title}</p>
            <div className="ml-auto">{getPriorityIcon(task.priority)}</div>
            <Badge variant="outline">{getStatusText(task.status)}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
