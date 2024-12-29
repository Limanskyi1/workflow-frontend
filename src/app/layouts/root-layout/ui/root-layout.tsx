import { Outlet } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";

export const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
