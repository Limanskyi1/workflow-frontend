import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./use-login";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { useLoginMutation } from "../../api/auth-api";
import { useToast } from "@/features/toast";

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));
jest.mock("../../api/auth-api", () => ({ useLoginMutation: jest.fn() }));
jest.mock("@/shared/hooks/use-app-dispatch", () => ({ useAppDispatch: jest.fn() }));
jest.mock("@/features/toast", () => ({
  useToast: jest.fn(),
  TOAST_CONFIG: { loginSuccess: "Login successful" },
}));

describe("useLogin хук", () => {
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

  it("should call login API, dispatch tokens, navigate, and show toast on success", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({ email: "test@example.com", password: "password" });
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
    })

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockToast).toHaveBeenCalledWith("Login successful");
  });
});






