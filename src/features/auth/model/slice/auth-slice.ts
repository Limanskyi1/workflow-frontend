import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  isAuthenticated: !!Cookies.get("accessToken"),
};

const setAuthCookie = (name: string, token: string) => {
  Cookies.set(name, token, {
    secure: true,
    sameSite: "strict",
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>,
    ) => {
      const { access_token, refresh_token } = action.payload;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;
      setAuthCookie("accessToken", access_token);
      setAuthCookie("refreshToken", refresh_token);
    },
    removeTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const { setTokens, removeTokens } = authSlice.actions;

export default authSlice.reducer;
