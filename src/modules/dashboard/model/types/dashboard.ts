import { Column } from "@/modules/column/model/types/column";

export interface Dashboard {
  id: number;
  title: string;
  ownerId: number;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}
