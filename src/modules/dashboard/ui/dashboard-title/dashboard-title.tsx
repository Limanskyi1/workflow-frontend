import { useDashboardTitle } from "../../hooks/use-dashboard-title";
import { DashboardTitleEditMode } from "./dashboard-title-edit-mode/dashboard-title-edit-mode";
import { DashboardTitleViewMode } from "./dashboard-title-view-mode/dashboard-title-view-mode";

interface DashboardTitleProps {
  title: string;
  id: number;
}

export const DashboardTitle = ({ title, id }: DashboardTitleProps) => {
  const {
    register,
    reset,
    isHovered,
    isEditing,
    setEditMode,
    onHover,
    onLeave,
    onSubmit,
  } = useDashboardTitle(id, title);

  if (!isEditing) {
    return (
      <DashboardTitleViewMode
        title={title}
        isHovered={isHovered}
        onHover={onHover}
        onLeave={onLeave}
        setEditMode={setEditMode}
      />
    );
  }

  return (
    <DashboardTitleEditMode
      setEditMode={setEditMode}
      register={register}
      onSubmit={onSubmit}
      reset={reset}
    />
  );
};
