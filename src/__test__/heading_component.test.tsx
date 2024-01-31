import { render, screen } from "@testing-library/react";
import Heading from "../components/Heading";

describe("Testing Heading Component", () => {
  it("Heading component will render what is passed as props", () => {
    render(<Heading title="Test Heading" />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Test Heading/i);
  });
});
