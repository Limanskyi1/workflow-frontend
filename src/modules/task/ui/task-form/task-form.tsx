import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { DatePicker } from "@/shared/ui/date-picker";
import { InputFactory } from "@/shared/ui/input/input-factory";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select/select";

import { CreateTask, UpdateTask } from "../../../../entities/task/model/types";
import {
  TaskPrioritiesItem,
  taskPriorities,
} from "../../consts/task-priorities";
import { TaskStatusesItem, taskStatuses } from "../../consts/task-statuses";
import { TaskDescriptionEditor } from "../task-description-editor/task-description-editor";

interface TaskFormProps {
  defaultValues?: CreateTask | UpdateTask;
  onSubmit: (data: any) => Promise<void>;
  button: ReactNode;
}

export const TaskForm = ({
  defaultValues,
  onSubmit,
  button,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
    >
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
      <div>
        <Label className="mb-2 block" htmlFor="description">
          Description
        </Label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Description is required",
          }}
          render={({ field }) => (
            <TaskDescriptionEditor
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm mt-2">
            {formErrors.description.message}
          </p>
        )}
      </div>
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
                (status) => status?.value === (field.value || "TO_DO"),
              )}
              onChange={(selectedOption: TaskStatusesItem) =>
                field.onChange(selectedOption.value)
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
                (priority) => priority?.value === (field.value || "LOW"),
              )}
              onChange={(selectedOption: TaskPrioritiesItem) =>
                field.onChange(selectedOption.value)
              }
            />
          )}
        />
      </div>
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <DatePicker date={field?.value} setDate={field.onChange} />
        )}
      />
      {button}
    </form>
  );
};
