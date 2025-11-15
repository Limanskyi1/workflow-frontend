import { Dashboard } from "@/widgets/dashboard";

import { DashboardPageLoader } from "./dashboard-page-loader";
import { useGetMyDashboardQuery } from "@/shared/api/dashboard/dashboard-api";

export const DashboardPage = () => {
  const dashboardQuery = useGetMyDashboardQuery();

  if (dashboardQuery.isLoading) {
    return <DashboardPageLoader />;
  }

  return <Dashboard dashboardTitle={dashboardQuery.data?.title ?? ""} />;
};
