import { createBrowserRouter } from "react-router-dom";

import { ConfirmCode, LoginForm, RegisterForm } from "@/features/auth";
import { DashboardPage } from "@/pages/dashboard";
import { NotesPage } from "@/pages/notes";
import { SettingsPage } from "@/pages/settings";

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
        path: "notes",
        element: (
          <RequireAuth>
            <NotesPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/confirmation",
    element: <ConfirmCode />,
  },
]);
