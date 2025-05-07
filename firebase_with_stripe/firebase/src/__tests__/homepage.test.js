import { render } from "@testing-library/react";
import Homepage from "../pages/Homepage";
import { MemoryRouter } from "react-router-dom";

// function renderComponent() {
//   render(<Homepage />);
// }

describe("homepage UI tests", () => {
  it("displays a header", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
  });
});
