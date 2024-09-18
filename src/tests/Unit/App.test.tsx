// src/tests/Form.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../../component/Organism/Form";

describe("Form Component", () => {
  test("renders the form component", () => {
    render(<Form />);
    const heading = screen.getByText(/Register/i);
    expect(heading).toBeInTheDocument();
  });
});
