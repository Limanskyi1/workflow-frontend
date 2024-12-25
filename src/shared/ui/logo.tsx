import { Trello } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex h-16 items-center gap-2 px-6">
      <Trello className="h-6 w-6" />
      <span className="text-xl font-semibold">WorkFlow</span>
    </div>
  );
};
