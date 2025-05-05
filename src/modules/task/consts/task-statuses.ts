import { TaskStatus } from "../../../entities/task/model/types";

export interface TaskStatusesItem {
  value: TaskStatus;
  label: string;
}

export const taskStatuses: TaskStatusesItem[] = [
  {
    value: "IN_BOX",
    label: "In box",
  },
  {
    value: "TO_DO",
    label: "To do",
  },
  {
    value: "IN_PROGRESS",
    label: "In progress",
  },
  {
    value: "WAITING",
    label: "Waiting",
  },
  {
    value: "IN_REVIEW",
    label: "In review",
  },
  {
    value: "DONE",
    label: "Done",
  },
];
