import { render, screen } from "@testing-library/react";

import { AuthHeader } from "./auth-header";

describe("AuthHeader", () => {
  it("should render the header with the provided text", () => {
    const text = "Login";
    render(<AuthHeader text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
