import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import Cookies from "js-cookie";

// eslint-disable-next-line no-restricted-imports
import {
  removeTokens,
  setTokens,
} from "@/features/auth/model/slice/auth-slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

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
        const { access_token, refresh_token: newRefreshToken } =
          refreshResult.data as { access_token: string; refresh_token: string };
        api.dispatch(
          setTokens({ access_token, refresh_token: newRefreshToken }),
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(removeTokens());
      }
    } else {
      api.dispatch(removeTokens());
    }
  }

  return result;
};
