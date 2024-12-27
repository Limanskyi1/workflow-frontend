import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/shared/api/baseApiWithReauth";

import { UpdateUserPasswordDto } from "../model/types/update-user-password.dto";
import { UpdateUserDto } from "../model/types/update-user.dto";
import { UserDto } from "../model/types/user.dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getMe: builder.query<UserDto, void>({
      query: () => "/users/me",
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<UserDto, UpdateUserDto>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    changeUserPassword: builder.mutation<UserDto, UpdateUserPasswordDto>({
      query: (credentials) => ({
        url: `/users/change-password`,
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateUserMutation,
  useChangeUserPasswordMutation,
} = userApi;
