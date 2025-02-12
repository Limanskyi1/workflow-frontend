import classnames from "classnames";
import { CommandList } from "cmdk";
import { Check, LoaderCircle, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Command, CommandGroup, CommandItem } from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface TaskProps {
  id: number;
  onDelete: (id: number) => void;
}

const Task = ({ id, onDelete }: TaskProps) => {
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

export const TaskMultiSelect = () => {
  const [selectedTasks, setSelectedTasks] = useState<TaskProps[]>([]);
  const [open, setOpen] = useState(false);

  const options = [
    { id: 1, label: "Create a new task" },
    { id: 2, label: "Rewrite a task" },
    { id: 3, label: "Rewrite a task" },
    { id: 4, label: "Rewrite a task" },
    { id: 5, label: "Rewrite a task" },
    { id: 6, label: "Rewrite a task" },
    { id: 7, label: "Rewrite a task" },
    { id: 8, label: "Rewrite a task" },
    { id: 9, label: "Rewrite a task" },
  ];

  const handleAddTask = (task: any) => {
    const isExists = selectedTasks.some(
      (selectedTask) => selectedTask.id === task.id,
    );
    if (!isExists) {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const handleRemoveTask = (taskId: number) => {
    const tasks = selectedTasks.filter(
      (selectedTask) => selectedTask.id !== taskId,
    );
    setSelectedTasks(tasks);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <div
          className={classnames(
            "border border-primary/10 p-1 rounded-md px-3 py-2 cursor-pointer flex items-center flex-wrap gap-1 relative",
            {
              "hover:bg-accent/40 transition ease-in-out":
                selectedTasks.length === 0,
            },
          )}
        >
          {selectedTasks.length === 0 ? (
            <span className="text-sm text-primary/60">Search for tasks</span>
          ) : (
            selectedTasks.map((task) => (
              <Task key={task.id} id={task.id} onDelete={handleRemoveTask} />
            ))
          )}
          <div className="[&_svg]:size-4 absolute right-1 top-[calc(50%-1rem]">
            <LoaderCircle
              className="animate-spin duration-[2000]"
              fill="primary"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="popoverContent p-1" asChild>
        <Command onClick={(e) => e.stopPropagation()}>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    handleAddTask(option);
                    setOpen(false);
                  }}
                  className="cursor-pointer transition ease-in-out"
                >
                  <div className="border border-primary/10 p-1 rounded-md [&_svg]:size-3">
                    <Check size={1} fill="primary" className="w-3! h-3!" />
                  </div>
                  <span>#{option.id}</span>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
