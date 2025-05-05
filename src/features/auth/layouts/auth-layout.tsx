import { ReactNode } from "react";

import { ThemeToggle } from "@/shared/lib/theming";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeToggle className="fixed right-4 top-4" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};
