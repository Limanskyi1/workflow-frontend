import { Plus } from "lucide-react";

import { useTasks, useTasksFilters } from "@/entities/task";
import { DashboardTitle } from "@/features/dashboard";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input/input";

import { useModals } from "../../../app/providers/modal";
import { DashboardColumn } from "./dashboard-column";

interface DashboardProps {
  dashboardTitle: string;
}

export const Dashboard = ({ dashboardTitle }: DashboardProps) => {
  const { openAddTaskModal } = useModals();
  const { title, debouncedTitle, onChangeTitle } = useTasksFilters();
  const { tasks: groupedTasks = [] } = useTasks({ title: debouncedTitle });

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={dashboardTitle} />
        <Button onClick={openAddTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div>
        <Input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          className="mt-2 max-w-[300px]"
          placeholder="Search"
        />
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {groupedTasks.map((column) => (
          <DashboardColumn
            key={column.id}
            status={column.status}
            tasks={column.tasks}
          />
        ))}
      </div>
    </section>
  );
};
