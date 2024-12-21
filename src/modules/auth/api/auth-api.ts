import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginDto } from "../model/types/login.dto";
import { RegisterDto } from "../model/types/register.dto";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: LoginDto) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: RegisterDto) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
