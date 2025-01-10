import { TaskPriority } from "@/shared/types";
import { Badge } from "@/shared/ui/badge";
import { Card, CardDescription, CardTitle } from "@/shared/ui/card";

import { priorityColors } from "../consts/priority-colors";
import { convertPriorityToText } from "../utils/convert-priority-to-text";

interface TaskCardProps {
  title: string;
  description: string;
  priority: TaskPriority;
}

export const TaskCard = ({ title, description, priority }: TaskCardProps) => {
  return (
    <Card className="p-3">
      <CardTitle className="text-sm font-medium mb-3">{title}</CardTitle>
      <CardDescription className="text-sm p-0 mb-2">
        {description}
      </CardDescription>
      <Badge variant="secondary" className={priorityColors[priority]}>
        {convertPriorityToText(priority)}
      </Badge>
    </Card>
  );
};
