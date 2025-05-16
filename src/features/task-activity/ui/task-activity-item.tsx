import {
  BadgePlus,
  CircleFadingArrowUp,
  OctagonX,
  Timer,
  X,
} from "lucide-react";
import { ReactNode, useState } from "react";

import { TaskActivityType } from "@/entities/task";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/utils/cn";

import { timeSince } from "../utils/timeSince";

const TaskActivityUIConfig: Record<
  TaskActivityType,
  { background: string; icon: ReactNode }
> = {
  DELETE: {
    background: "bg-red-500",
    icon: <OctagonX className="w-4 h-4" />,
  },
  CREATE: {
    background: "bg-green-500",
    icon: <BadgePlus className="w-4 h-4" />,
  },
  UPDATE: {
    background: "bg-blue-500",
    icon: <CircleFadingArrowUp className="w-4 h-4" />,
  },
};

interface TaskActivityItemProps {
  id: number;
  type: TaskActivityType;
  message: string;
  createdAt: Date;
  onDelete: (id: number) => void;
}

export const TaskActivityItem = (props: TaskActivityItemProps) => {
  const { id, message, type, createdAt, onDelete } = props;
  const { background, icon } = TaskActivityUIConfig[type];

  const [isHovered, setIsHovered] = useState(false);

  const onHover = () => setIsHovered(true);
  const onLeave = () => setIsHovered(false);

  return (
    <Card
      className={cn(`${background} relative`)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <CardHeader className="p-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className={`text-sm`}>{message}</CardTitle>
        </div>
        <CardFooter className="p-0">
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            <span className="text-xs">{timeSince(createdAt)}</span>
          </div>
        </CardFooter>
      </CardHeader>
      <X
        className={cn(
          "w-4 h-4 absolute top-2 right-2 transition ease-in cursor-pointer",
          isHovered ? "opacity-100" : "opacity-0",
        )}
        onClick={() => onDelete(id)}
      />
    </Card>
  );
};
