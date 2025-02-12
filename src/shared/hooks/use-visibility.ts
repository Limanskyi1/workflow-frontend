import { useCallback, useState } from "react";

export const useVisibility = (initialVisibility = false) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};
