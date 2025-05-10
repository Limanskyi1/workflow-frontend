import {
  useGetMyDashboardQuery,
  useUpdateDashboardMutation,
} from "@/entities/dashboard/api/dashboard-api";
import { UpdateDashboard } from "@/entities/dashboard/model/types";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

export const useDashboard = () => {
  const { toast } = useToast();
  const { data: dashboard, isLoading } = useGetMyDashboardQuery();
  const [updateDashboard] = useUpdateDashboardMutation();

  const updateTitle = async (data: UpdateDashboard) => {
    try {
      await updateDashboard({
        id: dashboard?.id as number,
        data,
      });
      toast(TOAST_CONFIG.dashboardTitleUpdateSuccess);
    } catch (error) {
      console.error(error);
      toast(TOAST_CONFIG.dashboardTitleUpdateWithError);
    }
  };

  return {
    dashboard,
    isDashboardLoading: isLoading,
    updateTitle,
  };
};
