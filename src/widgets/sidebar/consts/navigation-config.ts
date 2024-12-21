import { LayoutDashboard, Settings } from "lucide-react";

export type NavigationConfig = typeof NAVIGATION_CONFIG;

export const NAVIGATION_CONFIG = [
  { name: "Board", href: "/", icon: LayoutDashboard },
  { name: "Settings", href: "/settings", icon: Settings },
];
