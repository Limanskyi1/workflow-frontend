import { Task } from "./task";

export type CreateTask = Pick<Task, "title" | "description" | "status" | "priority" | "dueDate">;