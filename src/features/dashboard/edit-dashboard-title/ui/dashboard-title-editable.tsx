import { useState } from "react";
import { DashboardTitleEdit } from "./dashboard-title-edit";
import { DashboardTitleView } from "./dashboard-title-view";
import { useEditDashboardTitle } from "../model/hooks/use-edit-dashboard-title";

interface DashboardTitleEditableProps {
  title: string;
}

export const DashboardTitleEditable = ({
  title,
}: DashboardTitleEditableProps) => {
  const { updateTitle } = useEditDashboardTitle();

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
