import { Plus } from "lucide-react";

import { Column } from "@/modules/column";
import { ColumnType } from "@/modules/column";
import { TaskModalCreate } from "@/modules/task";
import { useModal } from "@/shared/hooks/use-modal";
import { Button } from "@/shared/ui/button";

import { DashboardTitle } from "./dashboard-title/dashboard-title";

interface DashboardProps {
  id: number;
  title: string;
  columns: ColumnType[];
}

export const Dashboard = ({ title, columns, id }: DashboardProps) => {
  const {
    isOpen: isAddTaskModalOpen,
    open: handleOpenTaskModal,
    close: handleCloseTaskModal,
  } = useModal();
  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={title} id={id} />
        <Button onClick={handleOpenTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {columns.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
      {isAddTaskModalOpen && <TaskModalCreate onClose={handleCloseTaskModal} />}
    </section>
  );
};
