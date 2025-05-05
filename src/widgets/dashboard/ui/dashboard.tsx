import { Plus } from "lucide-react";

import { DashboardTitle } from "@/features/dashboard-title-editable";
import { useModals } from "@/features/modals";
import { Column } from "@/modules/column";
import { ColumnType } from "@/modules/column";
import { Button } from "@/shared/ui/button";

interface DashboardProps {
  id: number;
  title: string;
  columns: ColumnType[];
}

export const Dashboard = ({ title, columns, id }: DashboardProps) => {
  const { handleOpenAddTaskModal } = useModals();

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={title} id={id} />
        <Button onClick={handleOpenAddTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {columns.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
    </section>
  );
};
