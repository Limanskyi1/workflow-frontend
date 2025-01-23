import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import { InputFactory } from "@/shared/ui/input/input-factory";
import { Label } from "@/shared/ui/label";
import { Select } from "@/shared/ui/select/select";

import {
  TaskPrioritiesItem,
  taskPriorities,
} from "../../consts/task-priorities";
import { TaskStatusesItem, taskStatuses } from "../../consts/task-statuses";
import { CreateTask } from "../../model/types/create-task";
import { UpdateTask } from "../../model/types/update-task";

interface TaskFormBaseSchema {
  title: string;
  description: string;
  status: TaskStatusesItem;
  priority: TaskPrioritiesItem;
  dueDate?: Date;
}

type TaskFormSchema<T> = T extends CreateTask
  ? TaskFormBaseSchema
  : Partial<TaskFormBaseSchema>;


interface TaskFormProps<T extends CreateTask | UpdateTask> {
  defaultValues: TaskFormSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  callbackAfterSubmit?: () => void;
}

export const TaskForm = <T extends CreateTask | UpdateTask>({
  defaultValues,
  onSubmit,
  callbackAfterSubmit
}: TaskFormProps<T>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<TaskFormBaseSchema>({
    defaultValues: defaultValues as TaskFormBaseSchema,
  });

  const onSubmitHandler = handleSubmit((data) => {
    const dataToSend: Partial<CreateTask> = {
        title: data.title,
        description: data.description,
        status: data.status?.value,
        priority: data.priority?.value ,
        dueDate: data.dueDate,
    };
    onSubmit(dataToSend as T);
    callbackAfterSubmit?.();
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmitHandler}>
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
                (status) => status?.value === field.value.value,
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
                (priority) => priority?.value === field.value.value,
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
      <Button className="w-fit ml-auto" type="submit">
        <Plus />
        Create
      </Button>
    </form>
  );
};
