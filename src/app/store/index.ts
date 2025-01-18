import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/modules/auth";
import { authApi } from "@/modules/auth/api/auth-api";
import { dashboardApi } from "@/modules/dashboard/api/dashboard-api";
import { userApi } from "@/modules/user/api/user-api";
import { tasksApi } from "@/modules/task/api/taskApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
