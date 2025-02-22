import classNames from "classnames";
import { LoaderCircle } from "lucide-react";

import { Task } from "../../model/types";
import { TaskOption } from "./task-option";

export const TaskMultiSelectBar = ({
  selectedTasks,
  handleRemoveTask,
}: {
  selectedTasks: Pick<Task, "title" | "id">[];
  handleRemoveTask: (id: number) => void;
}) => {
  const renderBar = () => {
    if (selectedTasks.length === 0) {
      return <span className="text-sm text-primary/60">Search for tasks</span>;
    } else {
      return selectedTasks.map((task) => (
        <TaskOption
          key={task.id}
          mode="view"
          viewProps={{
            id: task.id,
            onDelete: handleRemoveTask,
          }}
        />
      ));
    }
  };

  return (
    <div
      className={classNames(
        "border border-primary/10 p-1 rounded-md px-3 py-2 cursor-pointer flex items-center flex-wrap gap-1 relative",
        {
          "hover:bg-accent/40 transition ease-in-out":
            selectedTasks.length === 0,
        },
      )}
    >
      {renderBar()}
      <div className="[&_svg]:size-4 absolute right-1 top-[calc(50%-1rem]">
        <LoaderCircle className="animate-spin duration-[2000]" fill="primary" />
      </div>
    </div>
  );
};
