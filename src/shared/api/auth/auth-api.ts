import { baseApi } from "@/shared/api/baseApi";

import { Confirm, Login, Register } from "../../../features/auth/model/types";

export const authApi = baseApi.injectEndpoints({
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
    confirmCode: builder.mutation({
      query: (credentials: Confirm) => ({
        url: `/auth/confirm/`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useConfirmCodeMutation } =
  authApi;
