import {
  useGetMyDashboardQuery,
  useUpdateDashboardMutation,
} from "@/shared/api/dashboard/dashboard-api";
import { UpdateDashboard } from "@/entities/dashboard/model/types";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

export const useDashboardTitleEdit = () => {
  const { toast } = useToast();
  const dashboardQuery = useGetMyDashboardQuery();
  const [updateDashboard] = useUpdateDashboardMutation();

  const updateTitle = async (data: UpdateDashboard) => {
    try {
      await updateDashboard({
        id: dashboardQuery.data?.id as number,
        data,
      });
      toast(TOAST_CONFIG.dashboardTitleUpdateSuccess);
    } catch (error) {
      console.error(error);
      toast(TOAST_CONFIG.dashboardTitleUpdateWithError);
    }
  };

  return {
    updateTitle,
  };
};
