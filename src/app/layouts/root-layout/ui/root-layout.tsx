import { Outlet } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";

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
