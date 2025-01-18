import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { InputFactory } from "@/shared/ui/input/input-factory";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select/select";

import {
  TaskPrioritiesItem,
  taskPriorities,
} from "../../consts/task-priorities";
import { TaskStatusesItem, taskStatuses } from "../../consts/task-statuses";
import { useAddTaskModal } from "../../hooks/use-add-task-modal";

interface AddTaskModalProps {
  isOpen: boolean;
  close: () => void;
}

export const AddTaskModal = ({ isOpen, close }: AddTaskModalProps) => {
  const { register, formErrors, control, onSubmit } = useAddTaskModal(close);
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]" close={close}>
        <DialogHeader>
          <DialogTitle>Creating a task</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <InputFactory
            variant="labelAndError"
            options={{
              label: "Title",
              error: formErrors.title?.message,
            }}
            register={register("title", {
              required: "Title is required",
            })}
          />
          <InputFactory
            variant="labelAndError"
            options={{
              label: "Description",
              error: formErrors.description?.message,
            }}
            register={register("description", {
              required: "Description is required",
            })}
          />
          <div>
            <Label className="mb-2 block" htmlFor="status">
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  options={taskStatuses}
                  value={taskStatuses.find(
                    (status) => status?.value === field.value?.value,
                  )}
                  onChange={(selectedOption: TaskStatusesItem) =>
                    field.onChange(selectedOption)
                  }
                />
              )}
            />
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="priority">
              Priority
            </Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  options={taskPriorities}
                  value={taskPriorities.find(
                    (priority) => priority?.value === field.value?.value,
                  )}
                  onChange={(selectedOption: TaskPrioritiesItem) =>
                    field.onChange(selectedOption)
                  }
                />
              )}
            />
          </div>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker date={field.value} setDate={field.onChange} />
            )}
          />
          <Button className="w-fit ml-auto">
            <Plus />
            <span>Add task</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
