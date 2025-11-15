import { Task, TaskStatus } from "@/entities/task";

export interface DashboardColumn {
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
  columns: DashboardColumn[];
  createdAt: string;
  updatedAt: string;
}
