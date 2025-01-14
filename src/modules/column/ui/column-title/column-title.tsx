import { TaskStatus } from "@/modules/task/model/types/task-status";


interface ColumnTitleProps {
  status: TaskStatus;
  tasksLength: number;
}

export const ColumnTitle = ({ status, tasksLength }: ColumnTitleProps) => {
  return (
    <h2 className="font-semibold text-sm mb-3">
      {status.replace("_", " ")} ({tasksLength})
    </h2>
  );
};
