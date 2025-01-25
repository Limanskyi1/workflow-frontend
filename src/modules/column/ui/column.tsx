import { TaskCard } from "@/modules/task";
import { Task, TaskStatus } from "@/modules/task";

import { ColumnTitle } from "./column-title/column-title";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
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
