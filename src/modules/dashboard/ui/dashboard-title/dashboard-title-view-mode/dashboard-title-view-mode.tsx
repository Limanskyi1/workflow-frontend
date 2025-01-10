import { Edit2 } from "lucide-react";

interface ViewModeProps {
  title: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  setEditMode: (isEditable: boolean) => void;
}

export const DashboardTitleViewMode = ({
  title,
  isHovered,
  onHover,
  onLeave,
  setEditMode,
}: ViewModeProps) => {
  return (
    <div
      className="flex items-center justify-between max-w-[300px] gap-2 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <div
        className={`border border-primary/10 p-1 rounded-md cursor-pointer transition ease-in-out  ${isHovered ? "opacity-100" : "opacity-0"}`}
        onClick={() => setEditMode(true)}
      >
        <Edit2 width={20} height={20} />
      </div>
    </div>
  );
};
