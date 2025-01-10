import { TaskStatus } from "@/shared/types";

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
