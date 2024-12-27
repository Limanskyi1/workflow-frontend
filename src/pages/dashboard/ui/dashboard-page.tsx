import { Dashboard } from "@/modules/dashboard";
import { useGetMyDashboardQuery } from "@/modules/dashboard/api/dashboard-api";

export const DashboardPage = () => {
  const { data } = useGetMyDashboardQuery();

  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">DashboardPage</h1>
      <Dashboard />
    </div>
  );
};
