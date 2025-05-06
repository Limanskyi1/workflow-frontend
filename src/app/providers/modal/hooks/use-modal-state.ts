import { useState } from "react";

export const useModalState = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({
    isOpen: false,
    taskId: null,
  });
  const open = (taskId: number) => {
    setModalState({ isOpen: true, taskId });
  };
  const close = () => {
    setModalState({ isOpen: false, taskId: null });
  };
  return {
    modalState,
    open,
    close,
  };
};
