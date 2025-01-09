import { Edit2 } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { useRef } from "react";

import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { InputFactory } from "@/shared/ui/input/input-factory";

import { useDashboardTitle } from "../../hooks/use-dashboard-title";

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

  const titleRef = useRef<HTMLFormElement>(null);
  useOutsideClick(titleRef, () => {
    reset();
    setEditMode(false);
  });

  return (
    <form
      className="flex items-center justify-between max-w-[300px] gap-2"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onSubmit={onSubmit}
      ref={titleRef}
    >
      {isEditing ? (
        <InputFactory
          variant="default"
          className="border-none text-2xl font-bold"
          disabled={!isEditing}
          register={register("title", {
            required: "Title is required",
          })}
        />
      ) : (
        <h1 className="text-2xl font-bold">{title}</h1>
      )}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <button
            className={`border border-primary/10 p-1 rounded-md cursor-pointer`}
            type="submit"
          >
            <SendHorizontal width={20} height={20} />
          </button>
        ) : (
          <div
            className={`border border-primary/10 p-1 rounded-md cursor-pointer ${isHovered ? "opacity-100" : "opacity-0"}`}
            onClick={() => setEditMode(true)}
          >
            <Edit2 width={20} height={20} />
          </div>
        )}
      </div>
    </form>
  );
};
