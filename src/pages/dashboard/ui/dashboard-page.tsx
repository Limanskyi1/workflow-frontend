import { useDashboard } from "@/entities/dashboard";
import { Dashboard } from "@/widgets/dashboard";

import { DashboardPageLoader } from "./dashboard-page-loader";

export const DashboardPage = () => {
  const { dashboard, isDashboardLoading } = useDashboard();

  if (isDashboardLoading) {
    return <DashboardPageLoader />;
  }

  return <Dashboard dashboardTitle={dashboard?.title || ""} />;
};
