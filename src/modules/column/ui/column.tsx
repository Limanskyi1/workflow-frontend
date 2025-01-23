import { TaskCard } from "@/modules/task";
import { Task as TaskType } from "@/modules/task/model/types/task";
import { TaskStatus } from "@/modules/task/model/types/task-status";

import { ColumnTitle } from "./column-title/column-title";

interface ColumnProps {
  status: TaskStatus;
  tasks: TaskType[];
}

export const Column = ({ status, tasks = [] }: ColumnProps) => {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-2">
      <ColumnTitle status={status} tasksLength={tasks.length} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          id={task.id}
        />
      ))}
    </div>
  );
};
