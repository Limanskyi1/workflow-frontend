import { Plus } from "lucide-react";

import { useGetTasksQuery } from "@/entities/task/api/taskApi";
import { DashboardTitle } from "@/features/dashboard-title-editable";
import { Button } from "@/shared/ui/button";

import { useModals } from "../../../app/providers/modal";
import { Column } from "./column";

interface DashboardProps {
  id: number;
  title: string;
}

export const Dashboard = ({ title, id }: DashboardProps) => {
  const { openAddTaskModal } = useModals();
  const { data: groupedTasks = [] } = useGetTasksQuery();

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={title} id={id} />
        <Button onClick={openAddTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {groupedTasks.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
    </section>
  );
};
