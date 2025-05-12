import { useGetActivitiesQuery } from "../api/taskApi";

export const useTasksActivities = () => {
  const { data: activities = [] } = useGetActivitiesQuery();
  return {
    activities,
  };
};
