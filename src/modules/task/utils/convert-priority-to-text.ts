import { TaskPriority } from "../model/types/task-priority";

export const convertPriorityToText = (priority: TaskPriority) => {
  if (!priority) {
    return;
  }
  return priority.toLowerCase();
};
