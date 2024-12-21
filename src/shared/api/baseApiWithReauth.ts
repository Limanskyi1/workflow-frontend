import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setTokens, logout } from "@/modules/auth/model/slice/auth-slice";
import Cookies from "js-cookie";
import { baseQuery } from "./baseApi";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as { accessToken: string; refreshToken: string };
        api.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
