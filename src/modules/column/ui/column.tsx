import { Plus } from "lucide-react";
import { memo } from "react";

import { useModals } from "@/features/modals";
import { TaskCard } from "@/modules/task";
import { Task, TaskStatus } from "@/modules/task";
import { Button } from "@/shared/ui/button";

import { ColumnTitle } from "./column-title/column-title";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export const Column = memo(({ status, tasks = [] }: ColumnProps) => {
 
  const { handleOpenAddTaskModal } = useModals();

  return (
    <div className="space-y-4 rounded-lg border bg-card p-2 group">
      <ColumnTitle status={status} tasksLength={tasks.length} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          priority={task.priority}
          id={task.id}
          taskRelationId={task.taskRelationId}
          dueDate={task.dueDate}
        />
      ))}
      <Button
        className={`w-full flex justify-start opacity-0 group-hover:opacity-100 transition`}
        onClick={handleOpenAddTaskModal}
        variant="ghost"
      >
        <Plus />
        <span>Create task</span>
      </Button>
    </div>
  );
});
