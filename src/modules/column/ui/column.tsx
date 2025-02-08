import { Plus } from "lucide-react";

import { TaskCard, TaskModalCreate } from "@/modules/task";
import { Task, TaskStatus } from "@/modules/task";
import { useModal } from "@/shared/hooks/use-modal";
import { useVisibility } from "@/shared/hooks/use-visibility";
import { Button } from "@/shared/ui/button";

import { ColumnTitle } from "./column-title/column-title";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

export const Column = ({ status, tasks = [] }: ColumnProps) => {
  const {
    isOpen: isAddTaskModalOpen,
    open: handleOpenTaskModal,
    close: handleCloseTaskModal,
  } = useModal();

  const {
    isVisible: isButtonVisible,
    show: showButton,
    hide: hideButton,
  } = useVisibility();

  return (
    <div
      className="space-y-4 rounded-lg border bg-card p-2"
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
      onClick={hideButton}
    >
      <ColumnTitle status={status} tasksLength={tasks.length} />
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          priority={task.priority}
          id={task.id}
          dueDate={task.dueDate}
        />
      ))}
      <Button
        className={`w-full flex justify-start ${isButtonVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleOpenTaskModal}
        variant="ghost"
      >
        <Plus />
        <span>Create task</span>
      </Button>
      {isAddTaskModalOpen && <TaskModalCreate onClose={handleCloseTaskModal} />}
    </div>
  );
};
