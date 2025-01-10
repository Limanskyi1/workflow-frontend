import { ThemeToggle } from "@/features/theming/ui/theme-toggle";
import { Logo } from "@/shared/ui/logo";

import { NAVIGATION_CONFIG } from "../consts/navigation-config";
import { LogoutBtn } from "./logout-btn";
import { SidebarLinks } from "./sidebar-links";

export const Sidebar = () => {
  return (
    <div className="flex w-48 flex-col border-r min-h-[100vh]">
      <Logo />
      <div className="flex-1 space-y-1 px-3 py-4">
        <SidebarLinks links={NAVIGATION_CONFIG} />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <ThemeToggle />
        <LogoutBtn />
      </div>
    </div>
  );
};
