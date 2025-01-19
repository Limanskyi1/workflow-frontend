import { Plus } from "lucide-react";
import { useState } from "react";

import { Column } from "@/modules/column";
import { Column as ColumnType } from "@/modules/column/model/types/column";
import { AddTaskModal } from "@/modules/task";
import { Button } from "@/shared/ui/button";

import { DashboardTitle } from "./dashboard-title/dashboard-title";

interface DashboardProps {
  id: number;
  title: string;
  columns: ColumnType[];
}

export const Dashboard = ({ title, columns, id }: DashboardProps) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={title} id={id} />
        <Button onClick={handleOpenModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {columns.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
      {isAddTaskModalOpen && (
        <AddTaskModal isOpen={isAddTaskModalOpen} close={handleCloseModal} />
      )}
    </section>
  );
};
