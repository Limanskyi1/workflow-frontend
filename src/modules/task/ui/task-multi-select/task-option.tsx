import { Check, X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { CommandItem } from "@/shared/ui/command";

import { Task } from "../../model/types";

export interface TaskOptionViewProps {
  id: number;
  onDelete: (id: number) => void;
}

export interface TaskOptionMenuProps {
  id: number;
  task: Pick<Task, "title" | "id">;
  handleAddTask: (task: Pick<Task, "title" | "id">) => void;
  setOpen: (open: boolean) => void;
}

interface TaskOptionProps {
  mode: "view" | "menu";
  viewProps?: TaskOptionViewProps;
  menuProps?: TaskOptionMenuProps;
}

export const TaskOption = ({ mode, viewProps, menuProps }: TaskOptionProps) => {
  if (mode === "view" && viewProps) {
    return <TaskOption.View id={viewProps.id} onDelete={viewProps.onDelete} />;
  }
  if (mode === "menu" && menuProps) {
    return (
      <TaskOption.Menu
        id={menuProps.id}
        task={menuProps.task}
        handleAddTask={menuProps.handleAddTask}
        setOpen={menuProps.setOpen}
      />
    );
  }
  return null;
};

TaskOption.View = ({ id, onDelete }: TaskOptionViewProps) => {
  return (
    <div
      className="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded-sm min-w-20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="border border-primary/10 p-1 rounded-md [&_svg]:size-2">
        <Check fill="primary" className="w-3! h-3!" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs"># {id}</span>
      </div>
      <Button
        className="p-1 [&_svg]:size-4 ml-auto h-fit"
        variant="ghost"
        onClick={() => onDelete(id)}
      >
        <X stroke="red" />
      </Button>
    </div>
  );
};

TaskOption.Menu = ({
  id,
  task,
  handleAddTask,
  setOpen,
}: TaskOptionMenuProps) => {
  return (
    <CommandItem
      key={id}
      onSelect={() => {
        handleAddTask(task);
        setOpen(false);
      }}
      className="cursor-pointer transition ease-in-out"
    >
      <div className="border border-primary/10 p-1 rounded-md [&_svg]:size-3">
        <Check size={1} fill="primary" className="w-3! h-3!" />
      </div>
      <span>#{task.id}</span>
      {task.title}
    </CommandItem>
  );
};
