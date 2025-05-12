import { BadgePlus, CircleFadingArrowUp, OctagonX, Timer } from "lucide-react";
import { ReactNode } from "react";

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
  message: string;
  type: TaskActivityType;
  createdAt: Date;
}

export const TaskActivityItem = (props: TaskActivityItemProps) => {
  const { message, type, createdAt } = props;
  const { background, icon } = TaskActivityUIConfig[type];

  return (
    <Card className={cn(`${background}`)}>
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
    </Card>
  );
};
