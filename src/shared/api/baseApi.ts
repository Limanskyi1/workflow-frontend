import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
