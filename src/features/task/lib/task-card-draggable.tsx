import { ReactNode } from "react";
import { useDrag } from "react-dnd";

import { TaskStatus } from "@/entities/task";

interface TaskCardDraggableProps {
  id: number;
  status: TaskStatus;
  children: ReactNode;
}

export const TaskCardDraggable = ({
  id,
  status,
  children,
}: TaskCardDraggableProps) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "TASK",
      item: { id, status },
    }),
    [],
  );
  return <div ref={dragRef}>{children}</div>;
};
