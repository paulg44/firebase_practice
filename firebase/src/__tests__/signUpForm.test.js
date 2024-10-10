import { screen, render } from "@testing-library/react";
import SignUpForm from "../pages/SignUpForm";
import { MemoryRouter } from "react-router-dom";

jest.mock("firebase/app");
jest.mock("firebase/auth");

test("form renders with 2 inputs and a button", () => {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
  const inputs = screen.getAllByRole("textbox");
  const btn = screen.getByRole("button", { name: /sign up/i });

  expect(inputs).toHaveLength(2);
  expect(btn).toBeInTheDocument();
});
