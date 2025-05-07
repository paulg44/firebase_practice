import { screen, render, waitFor } from "@testing-library/react";
import SignUpForm from "../pages/SignUpForm";
import { MemoryRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

// Mock Firebase methods
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

// Mock the 'auth' import to return a dummy value.
jest.mock("../config/firebase", () => ({
  auth: {},
}));

// Fetch Mock
global.fetch = jest.fn(() => {
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "User registered successfully" }),
  });
});

describe("SignUpForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("form renders with 2 inputs and a button", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    const inputs = screen.getAllByRole("textbox");
    // Make sure on passwords the id of the input corresponds to the for of the label
    const passwordInput = screen.getByLabelText(/password/i);
    const btn = screen.getByRole("button", { name: /sign up/i });

    // This passes because the test cannot recognise a password input by role
    expect(inputs).toHaveLength(2);
    expect(passwordInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test("user can fill in form and return api calls", async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/enter email/i);
    const usernameInput = screen.getByLabelText(/enter username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signUpBtn = screen.getByRole("button", { name: /sign up/i });

    user.click(emailInput);
    user.keyboard("test@email.com");
    user.click(usernameInput);
    user.keyboard("tester");
    user.click(passwordInput);
    user.keyboard("Test1234!");

    // Mock firebase response
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        uid: "12345",
        displayName: "tester",
      },
    });

    user.click(signUpBtn);

    // Assert firebase signup method was called with correct entered parameters
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@email.com",
        "Test1234!"
      );
    });

    // Assert that updateProfile was called with correct entered parameters
    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(
        {
          uid: "12345",
          displayName: "tester",
        },
        { displayName: "tester" }
      );
    });

    // Even though this was a bad idea at the time I will test the fetch was called just as I'm practicing
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/register",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "tester",
            uid: "12345",
          }),
        })
      );
    });
  });
});
