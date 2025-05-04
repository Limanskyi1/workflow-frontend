import { configureStore } from "@reduxjs/toolkit";

import { authApi, authReducer } from "@/features/auth";
import { dashboardApi } from "@/modules/dashboard";
import { tasksApi } from "@/modules/task";
import { baseApi } from "@/shared/api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
