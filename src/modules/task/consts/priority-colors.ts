import { TaskPriority } from "../model/types/task-priority";

export const priorityColors: Record<TaskPriority, string> = {
  LOWEST: "bg-green-500/10 text-green-500",
  LOW: "bg-green-500/10 text-green-500",
  MEDIUM: "bg-yellow-500/10 text-yellow-500",
  HIGH: "bg-red-500/10 text-red-500",
  HIGHEST: "bg-red-500/10 text-red-500",
};
