import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { AddTaskModal } from "../add-task-modal/add-task-modal";

interface AddTaskButtonProps {
    text:string;
}

export const AddTaskButton = ({ text }: AddTaskButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Button onClick={handleOpenModal}>
        <Plus />
        <span>{text}</span>
      </Button>
      {isModalOpen && <AddTaskModal isOpen={isModalOpen} close={handleCloseModal}/>}
    </>
  );
};
