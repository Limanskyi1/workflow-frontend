import { ReactNode } from "react";
import { useDrop } from "react-dnd";

import { TaskStatus, useTasks } from "@/entities/task";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils/cn";

type DraggableTask = {
  id: number;
  status: TaskStatus;
};

interface ColumnDroppableProps {
  status: TaskStatus;
  children: ReactNode;
}

export const ColumnDroppable = ({ status, children }: ColumnDroppableProps) => {
  const { editTask } = useTasks();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item: DraggableTask) => {
      if (item.status !== status) {
        await editTask(item.id, {
          status,
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className={cn("relative ")} ref={drop}>
      {children}
      {isOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-card rounded-lg border">
          <Badge
            variant="secondary"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <p className="text-center font-bold text-xs">
              {status.replace("_", " ")}
            </p>
          </Badge>
        </div>
      )}
    </div>
  );
};
