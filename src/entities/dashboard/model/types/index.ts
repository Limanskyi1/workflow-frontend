import { Task } from "@/modules/task";
import { TaskStatus } from "@/modules/task";

export interface Column {
  id: number;
  name: string;
  status: TaskStatus;
  boardId: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Dashboard {
  id: number;
  title: string;
  ownerId: number;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export type UpdateDashboard = Pick<Dashboard, "title">;
