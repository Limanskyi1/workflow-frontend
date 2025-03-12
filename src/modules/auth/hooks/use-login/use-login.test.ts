import { act, renderHook } from "@testing-library/react";

import { useNavigate } from "react-router-dom";

import { useToast } from "@/features/toast";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";

import { useLoginMutation } from "../../api/auth-api";
import { useLogin } from "./use-login";

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));
jest.mock("../../api/auth-api", () => ({ useLoginMutation: jest.fn() }));
jest.mock("@/shared/hooks/use-app-dispatch", () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock("@/features/toast", () => ({
  useToast: jest.fn(),
  TOAST_CONFIG: { loginSuccess: "Login successful" },
}));

describe("useLogin hook", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();
  let mockLoginMutation: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginMutation = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        access_token: "test_token",
        refresh_token: "test_refresh",
      }),
    });

    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLoginMutation as jest.Mock).mockReturnValue([mockLoginMutation]);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("successful login", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(mockLoginMutation).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });

    expect(mockLoginMutation.mock.results[0].value.unwrap).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "auth/setTokens",
      payload: {
        access_token: "test_token",
        refresh_token: "test_refresh",
      },
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockToast).toHaveBeenCalledWith("Login successful");
  });

  it("failed login", async () => {

    const wrongData = {
      email: "test@example.com",
      password: "wrong_password",
    };

    const { result } = renderHook(() => useLogin());
  
    const error = new Error("Test error");
    mockLoginMutation.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });
  
    await act(async () => {
      await result.current.onSubmit(wrongData);
    });
  
    expect(mockLoginMutation).toHaveBeenCalledWith(wrongData);
    expect(mockLoginMutation).toHaveBeenCalled();
    expect(result.current.error).not.toBeNull();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
  });
});
