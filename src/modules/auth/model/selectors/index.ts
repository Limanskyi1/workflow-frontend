import { RootState } from "@/app/store";

export const getIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
