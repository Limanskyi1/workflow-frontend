import { CommandList } from "cmdk";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Command, CommandGroup, CommandItem } from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

const Task = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="border border-primary/10 p-1 rounded-md [&_svg]:size-3">
        <Check fill="primary" className="w-3! h-3!" />
      </div>
      <span>#1</span>
    </div>
  );
};

export const TaskMultiSelect = () => {
  const [selectedTasks, setSelectedTasks] = useState<
    { id: number; label: string }[]
  >([]);
  const [open, setOpen] = useState(false);

  const options = [
    { id: 1, label: "Create a new task" },
    { id: 2, label: "Rewrite a task" },
  ];

  const handleSelectionChange = (task: any) => {
    setSelectedTasks([...selectedTasks, task]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <div className="border border-primary/10 p-1 rounded-md px-3 py-2 hover:bg-accent/40 transition ease-in-out cursor-pointer flex justify-between items-center">
          {selectedTasks.length < 1 ? <span className="text-sm text-primary/60">Search for tasks</span> : 
          selectedTasks.map((task) => (
            <Task key={task.id} />
          ))}
          <LoaderCircle
            className="animate-spin duration-[2000]"
            fill="primary"
          />
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
                    handleSelectionChange(option);
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
