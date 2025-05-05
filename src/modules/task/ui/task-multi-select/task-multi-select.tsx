import { CommandList } from "cmdk";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Command, CommandGroup } from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { Task } from "../../../../entities/task/model/types";
import { useGetAllWithoutRelationsQuery } from "../../api/taskApi";
import { TaskMultiSelectBar } from "./task-multi-select-bar";
import { TaskOption } from "./task-option";

interface TaskMultiSelectProps {
  selectedTasks: Pick<Task, "title" | "id">[];
  currentTaskId: number;
  handleAddTask: (task: any) => void;
  handleRemoveTask: (id: number) => void;
}

export const TaskMultiSelect = (props: TaskMultiSelectProps) => {
  const { selectedTasks, currentTaskId, handleAddTask, handleRemoveTask } =
    props;
  const { data: tasks = [], isLoading } = useGetAllWithoutRelationsQuery();

  const [open, setOpen] = useState(false);

  const taskOptions = tasks.filter(
    (task) =>
      !selectedTasks.some((t) => t.id === task.id) && task.id !== currentTaskId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger>
        <TaskMultiSelectBar
          selectedTasks={selectedTasks}
          handleRemoveTask={handleRemoveTask}
        />
      </PopoverTrigger>
      <PopoverContent className="popoverContent p-1" asChild>
        <Command onClick={(e) => e.stopPropagation()}>
          <CommandList>
            <CommandGroup>
              {isLoading ? (
                <LoaderCircle
                  className="animate-spin duration-[2000] mx-auto"
                  fill="primary"
                />
              ) : taskOptions.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  No tasks available
                </p>
              ) : (
                taskOptions.map((task) => {
                  return (
                    <TaskOption
                      key={task.id}
                      mode="menu"
                      menuProps={{
                        id: task.id,
                        task,
                        handleAddTask,
                        setOpen,
                      }}
                    />
                  );
                })
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
