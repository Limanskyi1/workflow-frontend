import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/shared/api/baseQueryWithReauth";

import { Login, Register } from "../model/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Login) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: Register) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
