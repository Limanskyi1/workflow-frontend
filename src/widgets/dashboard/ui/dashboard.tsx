import { Plus } from "lucide-react";

import { useTasks, useTasksFilters } from "@/entities/task";
import { DashboardTitle } from "@/features/dashboard-title-editable";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input/input";

import { useModals } from "../../../app/providers/modal";
import { Column } from "./column";

interface DashboardProps {
  id: number;
  dashboardTitle: string;
}

export const Dashboard = ({ dashboardTitle, id }: DashboardProps) => {
  const { openAddTaskModal } = useModals();
  const { title, changeTitleDebounced } = useTasksFilters();
  const { tasks: groupedTasks = [] } = useTasks({ title });

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={dashboardTitle} id={id} />
        <Button onClick={openAddTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div>
        <Input
          onChange={(e) => changeTitleDebounced(e.target.value)}
          className="mt-2 max-w-[300px]"
          placeholder="Search"
        />
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {groupedTasks.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
    </section>
  );
};
