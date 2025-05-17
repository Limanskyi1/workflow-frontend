import { LayoutDashboard, Notebook, Settings } from "lucide-react";

export const NAVIGATION_CONFIG = [
  { name: "Board", href: "/", icon: LayoutDashboard },
  { name: "Notes", href: "/notes", icon: Notebook },
  { name: "Settings", href: "/settings", icon: Settings },
];

export type NavigationConfig = typeof NAVIGATION_CONFIG;
