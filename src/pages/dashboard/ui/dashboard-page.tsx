import { Dashboard } from "@/modules/dashboard";
import { useGetMyDashboardQuery } from "@/modules/dashboard/api/dashboard-api";

import { DashboardPageLoader } from "./dashboard-page-loader/dashboard-page-loader";

export const DashboardPage = () => {
  const { data: dashboard, isLoading } = useGetMyDashboardQuery();

  if (isLoading) {
    return <DashboardPageLoader />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{dashboard?.title}</h1>
      <Dashboard />
    </div>
  );
};
