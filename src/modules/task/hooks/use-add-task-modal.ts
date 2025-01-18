import { useForm } from "react-hook-form";

import { useCreateTaskMutation } from "../api/taskApi";
import { TaskPrioritiesItem, taskPriorities } from "../consts/task-priorities";
import { TaskStatusesItem, taskStatuses } from "../consts/task-statuses";
import { CreateTask } from "../model/types/create-task";

interface AddTaskShema {
  title: string;
  description: string;
  status: TaskStatusesItem;
  priority: TaskPrioritiesItem;
  dueDate?: Date;
}

const defaultValues: AddTaskShema = {
  title: "",
  description: "",
  status: taskStatuses[0],
  priority: taskPriorities[0],
};

export const useAddTaskModal = (close: () => void) => {
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm<AddTaskShema>({
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    const dataToSend: CreateTask = {
      title: data.title,
      description: data.description,
      status: data.status.value,
      priority: data.priority.value,
    };
    if (data.dueDate) {
      dataToSend["dueDate"] = data.dueDate.toISOString();
    }
    try {
      await createTask(dataToSend).unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    formErrors,
    control,
    onSubmit,
  };
};
