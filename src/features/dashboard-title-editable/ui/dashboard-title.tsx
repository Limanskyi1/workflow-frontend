import { useState } from "react";

import { useDashboard } from "@/entities/dashboard";

import { DashboardTitleEdit } from "./dashboard-title-edit";
import { DashboardTitleView } from "./dashboard-title-view";

interface DashboardTitleProps {
  title: string;
  id: number;
}

export const DashboardTitle = ({ title, id }: DashboardTitleProps) => {
  const { updateTitle } = useDashboard(id);

  const [isEditing, setIsEditing] = useState(false);
  const setEditMode = (isEditable: boolean) => setIsEditing(isEditable);

  if (!isEditing) {
    return <DashboardTitleView title={title} setEditMode={setEditMode} />;
  }

  return (
    <DashboardTitleEdit
      title={title}
      setEditMode={setEditMode}
      onSubmit={updateTitle}
    />
  );
};
