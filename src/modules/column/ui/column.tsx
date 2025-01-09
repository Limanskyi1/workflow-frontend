import { Task as TaskType } from "@/modules/task/model/types/task";
import { TaskStatus } from "@/shared/types";

interface ColumnProps {
  status: TaskStatus;
  tasks: TaskType[];
}

export const Column = ({ status, tasks }: ColumnProps) => {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-2">
      <h2 className="font-semibold text-sm">
        {status.replace("_", " ")} ({tasks.length})
      </h2>
    </div>
  );
};
