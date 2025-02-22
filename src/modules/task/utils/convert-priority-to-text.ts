import { TaskPriority } from "../model/types";

export const convertPriorityToText = (priority: TaskPriority) => {
  if (!priority) {
    return;
  }
  return priority.toLowerCase();
};
