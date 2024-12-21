import { Sidebar } from "@/widgets/sidebar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      123
      <main>
        <Outlet />
      </main>
    </div>
  );
};
