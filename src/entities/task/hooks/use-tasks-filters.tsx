import debounce from "lodash/debounce";
import { useState } from "react";

export const useTasksFilters = () => {
  const [title, setTitle] = useState<string>("");
  const changeTitle = (newTitle: string) => setTitle(newTitle);
  return {
    title,
    changeTitle,
    changeTitleDebounced: debounce(changeTitle, 300),
  };
};
