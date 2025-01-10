import { TaskPriority } from "@/shared/types";

export const convertPriorityToText = (priority: TaskPriority) => {
  if (!priority) {
    return;
  }
  return priority.toLowerCase();
};
