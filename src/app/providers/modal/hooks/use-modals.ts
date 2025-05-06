import { useContext } from "react";

import { ModalsContext } from "../modals-provider";

export const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
