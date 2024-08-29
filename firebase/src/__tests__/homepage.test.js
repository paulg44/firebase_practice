import { screen, render } from "@testing-library/react";
import Homepage from "../pages/Homepage";

function renderComponent() {
  render(<Homepage />);
}

describe("homepage UI tests", () => {
  it("displays a header", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /banana/i })
    ).toBeInTheDocument();
  });
});
