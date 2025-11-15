import { UpdateUser, UpdateUserPassword, User } from "@/entities/user/model/types";
import { baseApi } from "@/shared/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
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
} = usersApi;
