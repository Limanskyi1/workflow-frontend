import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { InputFactory } from "@/shared/ui/input/input-factory";
import { Select } from "@/shared/ui/select/select";
import { taskStatuses } from "../../consts/task-statuses";
import { taskPriorities } from "../../consts/task-priorities";

interface AddTaskModalProps {
  isOpen: boolean;
  close: () => void;
}

export const AddTaskModal = ({ isOpen, close }: AddTaskModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
              error: formErrors.title?.message,
            }}
            register={register("description", {
              required: "Description is required",
            })}
          />
          <Select options={taskStatuses} defaultValue={taskStatuses[0]}/>
          <Select options={taskPriorities} defaultValue={taskPriorities[0]}/>
        </form>
      </DialogContent>
    </Dialog>
  );
};
