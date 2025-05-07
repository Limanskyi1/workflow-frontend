import { Calendar } from "lucide-react";

import { Badge } from "@/shared/ui/badge";

export const TaskCardDateBadge = ({ taskDueDate }: { taskDueDate: Date }) => {
  const formatDate = (inputDate: Date) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();

    return `${day} ${month}`;
  };

  return (
    <Badge
      variant="secondary"
      className="p-1 w-fit mb-3 flex items-center gap-2"
    >
      <Calendar width={14} height={14} />
      <span className="font-extrabold color/primary opacity-60">
        {formatDate(taskDueDate)}
      </span>
    </Badge>
  );
};
