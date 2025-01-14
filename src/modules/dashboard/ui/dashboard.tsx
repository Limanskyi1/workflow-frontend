import { Column } from "@/modules/column";
import { Column as ColumnType } from "@/modules/column/model/types/column";
import { AddTaskButton } from "@/modules/task/ui/add-task-button/add-task-button";

import { DashboardTitle } from "./dashboard-title/dashboard-title";

interface DashboardProps {
  id: number;
  title: string;
  columns: ColumnType[];
}

export const Dashboard = ({ title, columns, id }: DashboardProps) => {
  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <DashboardTitle title={title} id={id} />
        <AddTaskButton text="Add task"/>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4 flex-1">
        {columns.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks} />
        ))}
      </div>
    </section>
  );
};
