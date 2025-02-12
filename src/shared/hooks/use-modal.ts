import { MouseEvent, useCallback, useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(true);
  }, []);

  const close = useCallback((e?: MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open,
    close,
  };
};
