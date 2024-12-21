import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

      Cookies.set("accessToken", access_token, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refresh_token, {
        secure: true,
        sameSite: "strict",
      });
    },
    removeTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const { setTokens, removeTokens, logout } = authSlice.actions;

export default authSlice.reducer;
