import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  name: string;
  href: string;
  icon: ReactNode;
}

export const SidebarLink = ({ name, href, icon }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Link key={name} to={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start gap-2", isActive && "bg-secondary")}
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
};
