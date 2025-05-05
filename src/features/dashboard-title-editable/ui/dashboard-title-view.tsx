import { Edit2 } from "lucide-react";
import { useState } from "react";

interface ViewModeProps {
  title: string;
  setEditMode: (isEditable: boolean) => void;
}

export const DashboardTitleView = ({ title, setEditMode }: ViewModeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const onHover = () => setIsHovered(true);
  const onLeave = () => setIsHovered(false);

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
