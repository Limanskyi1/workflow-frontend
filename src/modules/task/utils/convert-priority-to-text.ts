import { TaskPriority } from "../model/types";

export const convertPriorityToText = (priority: TaskPriority) =>
  priority.toLowerCase();
