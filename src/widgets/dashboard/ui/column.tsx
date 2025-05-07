import { Plus } from "lucide-react";
import { memo } from "react";

import { Task, TaskStatus } from "@/entities/task";
import { Button } from "@/shared/ui/button";
import { TaskCard } from "@/widgets/task-card";

import { useModals } from "../../../app/providers/modal";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export const Column = memo(({ status, tasks = [] }: ColumnProps) => {
  const { openAddTaskModal } = useModals();

  return (
    <div className="space-y-4 rounded-lg border bg-card p-2 group">
      <h2 className="font-semibold text-sm mb-3">
        {status.replace("_", " ")} ({tasks.length})
      </h2>
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
        onClick={openAddTaskModal}
        variant="ghost"
      >
        <Plus />
        <span>Create task</span>
      </Button>
    </div>
  );
});
