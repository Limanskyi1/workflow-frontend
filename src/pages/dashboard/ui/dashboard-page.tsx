import { useGetMyDashboardQuery } from "@/entities/dashboard";
import { Dashboard } from "@/widgets/dashboard";

import { DashboardPageLoader } from "./dashboard-page-loader/dashboard-page-loader";

export const DashboardPage = () => {
  const { data: dashboard, isLoading } = useGetMyDashboardQuery();

  if (isLoading) {
    return <DashboardPageLoader />;
  }

  return (
    <Dashboard
      title={dashboard?.title || ""}
      columns={dashboard?.columns || []}
      id={dashboard?.id || 0}
    />
  );
};
