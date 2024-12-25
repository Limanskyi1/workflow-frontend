import { NavigationConfig } from "../consts/navigation-config";
import { SidebarLink } from "./sidebar-link";

export const SidebarLinks = ({ links = [] }: { links: NavigationConfig }) => {
  return links.map((link, index) => {
    return (
      <div className="flex flex-col gap-4" key={index}>
        <SidebarLink
          name={link.name}
          href={link.href}
          icon={<link.icon className="h-4 w-4" />}
        />
      </div>
    );
  });
};
