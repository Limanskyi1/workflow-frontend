import { taskPriorities } from "./task-priorities";
import { taskStatuses } from "./task-statuses";

export const taskFormValuesDefault = {
    title: "",
    description: "",
    status: taskStatuses[0],
    priority: taskPriorities[0],
  };