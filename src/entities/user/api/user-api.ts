import { baseApi } from "@/shared/api/baseApi";

import { UpdateUser, UpdateUserPassword, User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    changeUserPassword: builder.mutation<User, UpdateUserPassword>({
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
