import { useUpdateDashboardMutation } from "@/entities/dashboard/api/dashboard-api";
import { UpdateDashboard } from "@/entities/dashboard/model/types";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

export const useDashboard = (id: number) => {
  const { toast } = useToast();
  const [updateDashboard] = useUpdateDashboardMutation();

  const updateTitle = async (data: UpdateDashboard) => {
    try {
      await updateDashboard({
        id,
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
