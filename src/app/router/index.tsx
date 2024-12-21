import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";
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
            <HomePage />
          </RequireAuth>
        ),
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
