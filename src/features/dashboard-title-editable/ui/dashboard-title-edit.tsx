import { Check, X } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { UpdateDashboard } from "@/entities/dashboard/model/types";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { Input } from "@/shared/ui/input/input";

interface EditModeProps {
  title: string;
  setEditMode: (isEditable: boolean) => void;
  onSubmit: (data: UpdateDashboard) => Promise<void>;
}

export const DashboardTitleEdit = ({
  title,
  setEditMode,
  onSubmit,
}: EditModeProps) => {
  const titleRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title,
    },
  });

  useOutsideClick(titleRef, () => {
    reset();
    setEditMode(false);
  });

  return (
    <form
      className="flex items-center justify-between max-w-[300px] gap-2"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setEditMode(false);
        reset();
      })}
      ref={titleRef}
    >
      <Input
        className="border-none text-2xl font-bold"
        {...register("title", {
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
