import {
  useDeleteActivitiesMutation,
  useGetActivitiesQuery,
} from "../api/taskApi";

export const useTasksActivities = () => {
  const { data: activities = [] } = useGetActivitiesQuery(undefined, {
    pollingInterval: 10000,
  });
  const [deleteActivities] = useDeleteActivitiesMutation();

  const deleteAllActivities = async () => {
    try {
      await deleteActivities().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activities,
    deleteAllActivities,
  };
};
