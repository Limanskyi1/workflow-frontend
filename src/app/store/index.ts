import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/modules/auth";
import { authApi } from "@/modules/auth/api/auth-api";
import { dashboardApi } from "@/modules/dashboard/api/dashboard-api";
import { userApi } from "@/modules/user/api/user-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
