import {
  useDeleteActivitiesMutation,
  useDeleteTaskActivityMutation,
  useGetActivitiesQuery,
} from "../api/taskApi";

export const useTasksActivities = () => {
  const { data: activities = [] } = useGetActivitiesQuery(undefined, {
    pollingInterval: 10000,
  });
  const [deleteActivities] = useDeleteActivitiesMutation();
  const [deleteTaskActivity] = useDeleteTaskActivityMutation();

  const deleteAllActivities = async () => {
    try {
      await deleteActivities().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActivity = async (activityId: number) => {
    try {
      await deleteTaskActivity(activityId);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activities,
    deleteAllActivities,
    deleteActivity,
  };
};
