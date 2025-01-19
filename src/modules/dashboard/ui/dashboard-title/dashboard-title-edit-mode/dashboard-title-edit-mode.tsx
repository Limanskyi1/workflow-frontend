import { Check, X } from "lucide-react";
import { useRef } from "react";

import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { InputFactory } from "@/shared/ui/input/input-factory";

interface EditModeProps {
  register: any;
  reset: any;
  setEditMode: (isEditable: boolean) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const DashboardTitleEditMode = ({
  setEditMode,
  register,
  reset,
  onSubmit,
}: EditModeProps) => {
  const titleRef = useRef<HTMLFormElement>(null);
  useOutsideClick(titleRef, () => {
    reset();
    setEditMode(false);
  });
  return (
    <form
      className="flex items-center justify-between max-w-[300px] gap-2"
      onSubmit={onSubmit}
      ref={titleRef}
    >
      <InputFactory
        variant="default"
        className="border-none text-2xl font-bold"
        register={register("title", {
          required: "Title is required",
        })}
      />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            className={`border border-primary/10 p-1 rounded-md cursor-pointer`}
            type="submit"
          >
            <Check width={20} height={20} />
          </button>
          <button
            className={`border border-primary/10 p-1 rounded-md cursor-pointer`}
            onClick={() => setEditMode(false)}
          >
            <X width={20} height={20} />
          </button>
        </div>
      </div>
    </form>
  );
};
