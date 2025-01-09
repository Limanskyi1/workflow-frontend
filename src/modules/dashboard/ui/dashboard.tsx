import { Column } from "@/modules/column";
import { Column as ColumnType } from "@/modules/column/model/types/column";
import { DashboardTitle } from "./dashboard-title/dashboard-title";

interface DashboardProps {
  id: number;
  title: string;
  columns: ColumnType[];
}

export const Dashboard = ({ title, columns , id}: DashboardProps) => {
  return (
    <div>
      <DashboardTitle title={title} id={id}/>
      <div className="grid grid-cols-6 gap-2 mt-4">
        {columns.map((column) => (
          <Column key={column.id} status={column.status} tasks={column.tasks}/>
        ))}
      </div>
    </div>
  );
};
