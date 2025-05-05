import { act, renderHook } from "@testing-library/react";

import { useNavigate } from "react-router-dom";

import { useToast } from "@/shared/lib/toast";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";

import { useRegisterMutation } from "../../api/auth-api";
import { useRegister } from "./use-register";

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));
jest.mock("../../api/auth-api", () => ({ useRegisterMutation: jest.fn() }));
jest.mock("@/shared/hooks/use-app-dispatch", () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock("@/shared/lib/toast", () => ({
  useToast: jest.fn(),
  TOAST_CONFIG: { registrationSuccess: "Registration successful" },
}));

describe("useLogin hook", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();
  let mockRegisterMutation: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRegisterMutation = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        access_token: "test_token",
        refresh_token: "test_refresh",
      }),
    });

    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useRegisterMutation as jest.Mock).mockReturnValue([mockRegisterMutation]);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("successful register", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.onSubmit({
        name: "test",
        email: "test@example.com",
        password: "password",
      });
    });

    expect(mockRegisterMutation).toHaveBeenCalledWith({
      name: "test",
      email: "test@example.com",
      password: "password",
    });
    expect(
      mockRegisterMutation.mock.results[0].value.unwrap,
    ).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "auth/setTokens",
      payload: {
        access_token: "test_token",
        refresh_token: "test_refresh",
      },
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockToast).toHaveBeenCalledWith("Registration successful");
  });

  it("failed login", async () => {
    const wrongData = {
      name: "test",
      email: "test@example.com",
      password: "wrong_password",
    };

    const { result } = renderHook(() => useRegister());

    const error = new Error("Test error");
    mockRegisterMutation.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(error),
    });

    await act(async () => {
      await result.current.onSubmit(wrongData);
    });

    expect(mockRegisterMutation).toHaveBeenCalledWith(wrongData);
    expect(mockRegisterMutation).toHaveBeenCalled();
    expect(result.current.error).not.toBeNull();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
  });
});
