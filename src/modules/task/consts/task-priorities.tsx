import { ReactNode } from "react";

import { TaskPriority } from "../../../entities/task/model/types";

export interface TaskPrioritiesItem {
  value: TaskPriority;
  label: string;
  icon: ReactNode;
}

export const taskPriorities: TaskPrioritiesItem[] = [
  {
    value: "LOWEST",
    label: "Lowest",
    icon: (
      <img
        className="w-5"
        src="/icons/task-priorities/lowest.svg"
        alt="lowest icon"
      />
    ),
  },
  {
    value: "LOW",
    label: "Low",
    icon: (
      <img
        className="w-5"
        src="/icons/task-priorities/low.svg"
        alt="low icon"
      />
    ),
  },
  {
    value: "MEDIUM",
    label: "Medium",
    icon: (
      <img
        className="w-5"
        src="/icons/task-priorities/medium.svg"
        alt="medium icon"
      />
    ),
  },
  {
    value: "HIGH",
    label: "High",
    icon: (
      <img
        className="w-5"
        src="/icons/task-priorities/high.svg"
        alt="high icon"
      />
    ),
  },
  {
    value: "HIGHEST",
    label: "Highest",
    icon: (
      <img
        className="w-5"
        src="/icons/task-priorities/highest.svg"
        alt="highest icon"
      />
    ),
  },
];
