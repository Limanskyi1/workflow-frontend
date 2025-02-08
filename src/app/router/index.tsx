import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { SettingsPage } from "@/pages/settings";
import { NotFoundPage } from "@/pages/not-found";

import { RootLayout } from "../layouts/root-layout";
import { RequireAuth } from "./require-auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "settings",
        element: (
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: (<NotFoundPage/>),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
