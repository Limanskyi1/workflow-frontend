import { TaskPriority, TaskStatus } from "@/shared/types";

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
    authorId: number;
    boardId: number;
    columnId: number;
    createdAt: string;
    updatedAt: string;
}