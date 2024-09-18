import { act, render, waitFor, screen } from "@testing-library/react";
import Form from "../../component/Organism/Form";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Form Component", () => {
  test("allows user to input data in all fields and submit button funtionality", async () => {
    render(<Form />);

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("First Name"), "Rashik")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Last Name"), "Koirala")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Email"),
          "example@example.com"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Password"), "password123")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Confirm Password"),
          "password123"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Address"),
          "1234 Street Name"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("City"), "Kathmandu")
      )
    );

    await waitFor(() =>
      act(() => userEvent.click(screen.getByLabelText("Male")))
    );

    await waitFor(() =>
      act(() => userEvent.selectOptions(screen.getByRole("combobox"), "Nepal"))
    );

    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Expect that the form was submitted without error
    expect(screen.getByText(/First Name: Rashik/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name: Koirala/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: example@example.com/i)).toBeInTheDocument();

    expect(screen.getByText(/Address: 1234 Street Name/i)).toBeInTheDocument();
    expect(screen.getByText(/City: Kathmandu/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: Nepal/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
  });

  test("wrong email format does not allow user to submit", async () => {
    render(<Form />);

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("First Name"), "Rashik")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Last Name"), "Koirala")
      )
    );

    await waitFor(() =>
      act(() => userEvent.type(screen.getByPlaceholderText("Email"), "example"))
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Password"), "password123")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Confirm Password"),
          "password123"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    expect(screen.getByPlaceholderText("Email")).toBeInvalid();
  });

  test("shows error when password and confirm password do not match", async () => {
    render(<Form />);

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("First Name"), "Rashik")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Last Name"), "Koirala")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Email"),
          "example@example.com"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Password"), "password123")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Confirm Password"),
          "password456"
        )
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Expect an error message about passwords not matching
    expect(screen.getByText(/Password does not match/i)).toBeInTheDocument();
  });

  test("resets error when password and confirm password match after an error", async () => {
    render(<Form />);

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("First Name"), "Rashik")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Last Name"), "Koirala")
      )
    );

    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Email"),
          "example@example.com"
        )
      )
    );

    // Trigger error by mismatching passwords
    await waitFor(() =>
      act(() =>
        userEvent.type(screen.getByPlaceholderText("Password"), "password123")
      )
    );
    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Confirm Password"),
          "password456"
        )
      )
    );
    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Fix passwords to match
    await waitFor(() =>
      act(() =>
        userEvent.clear(screen.getByPlaceholderText("Confirm Password"))
      )
    );
    await waitFor(() =>
      act(() =>
        userEvent.type(
          screen.getByPlaceholderText("Confirm Password"),
          "password123"
        )
      )
    );

    // Submit the form again
    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Error should disappear
    expect(
      screen.queryByText(/Password does not match/i)
    ).not.toBeInTheDocument();
  });

  test("displays selected gender correctly", async () => {
    render(<Form />);

    // Select Female
    await waitFor(() =>
      act(() => userEvent.click(screen.getByLabelText("Female")))
    );

    // Submit the form
    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Expect that the gender is "Female"
    expect(screen.getByText(/Gender: female/i)).toBeInTheDocument();
  });

  test("displays selected country correctly", async () => {
    render(<Form />);

    // Select USA from dropdown
    await waitFor(() =>
      act(() => userEvent.selectOptions(screen.getByRole("combobox"), "USA"))
    );

    // Submit the form
    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Expect that the country is "USA"
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
  });

  test("requires all the required fields", async () => {
    render(<Form />);

    // Attempt to submit the form without filling anything
    await waitFor(() =>
      act(() =>
        userEvent.click(screen.getByRole("button", { name: /Submit/i }))
      )
    );

    // Check that required fields are invalid
    expect(screen.getByPlaceholderText("First Name")).toBeInvalid();
    expect(screen.getByPlaceholderText("Last Name")).toBeInvalid();
    expect(screen.getByPlaceholderText("Email")).toBeInvalid();
    expect(screen.getByPlaceholderText("Password")).toBeInvalid();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInvalid();
  });
});
