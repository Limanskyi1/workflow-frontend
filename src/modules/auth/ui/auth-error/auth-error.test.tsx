import { render, screen } from "@testing-library/react";

import { AuthError } from "./auth-error";

describe("AuthError", () => {
  it("should render error text when errorText is provided", () => {
    render(<AuthError errorText="Error!" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
  it("should not render anything when errorText is not provided", () => {
    render(<AuthError />);
    expect(screen.queryByText("Error!")).toBeNull();
  });
  it("should apply the provided className", () => {
    render(<AuthError errorText="Error!" className="custom-class" />);
    const errorElement = screen.getByText("Error!");
    expect(errorElement).toHaveClass("custom-class");
  });
});
