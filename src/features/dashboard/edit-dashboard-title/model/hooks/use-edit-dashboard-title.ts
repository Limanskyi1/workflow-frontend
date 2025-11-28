import {
  useGetMyDashboardQuery,
  useUpdateDashboardMutation,
} from "@/shared/api/dashboard/dashboard-api";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

import { EditDashboardTitleBodyRequest } from "../types/edit-dashboard-title-types";

export const useEditDashboardTitle = () => {
  const { toast } = useToast();
  const dashboardQuery = useGetMyDashboardQuery();
  const [updateDashboard] = useUpdateDashboardMutation();

  const updateTitle = async (data: EditDashboardTitleBodyRequest) => {
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
