import { Plus, X } from "lucide-react";

import { useTasks, useTasksFilters } from "@/entities/task";
import { TaskActivityPanel } from "@/features/task-activity";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input/input";

import { useModals } from "../../../app/providers/modal";
import { DashboardColumn } from "./dashboard-column";
import { DashboardTitleEditable } from "@/features/dashboard/dashboard-title-edit";

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
        <DashboardTitleEditable title={dashboardTitle} />
        <Button onClick={openAddTaskModal}>
          <Plus />
          <span>Add task</span>
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="relative mt-2">
          <Input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            className="max-w-[300px]"
            placeholder="Search"
          />
          {title && (
            <X
              onClick={() => onChangeTitle("")}
              className="w-4 h-4 top-[50%] right-2 absolute translate-y-[-50%] cursor-pointer hover:scale-[1.2] transition ease-in-out"
            />
          )}
        </div>
        <TaskActivityPanel />
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
