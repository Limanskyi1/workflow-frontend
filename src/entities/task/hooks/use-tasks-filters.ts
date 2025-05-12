import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useTasksQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const setQueryParams = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (value) {
        newSearchParams.set(name, value);
      } else {
        newSearchParams.delete(name);
      }
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );
  return {
    searchQuery,
    setQueryParams,
  };
};

export const useTasksFilters = () => {
  const { searchQuery, setQueryParams } = useTasksQueryParams();

  const [filters, setFilters] = useState({
    title: {
      value: searchQuery,
      debouncedValue: searchQuery,
    },
  });

  const updateFiltersTitle = (fieldName: string, newTitle: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: {
        ...prevFilters.title,
        [fieldName]: newTitle,
      },
    }));
  };

  const changeTitle = (newTitle: string) => {
    updateFiltersTitle("value", newTitle);
    setQueryParams("search", newTitle);
  };

  const changeDebouncedTitle = useMemo(
    () =>
      debounce((newTitle: string) => {
        updateFiltersTitle("debouncedValue", newTitle);
      }, 300),
    [],
  );

  const onChangeTitle = (newTitle: string) => {
    changeTitle(newTitle);
    changeDebouncedTitle(newTitle);
  };

  return {
    title: filters.title.value,
    debouncedTitle: filters.title.debouncedValue,
    onChangeTitle,
  };
};
