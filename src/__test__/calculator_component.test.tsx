import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "../components/Calculator";

// Testing components

describe("Testing Calculator", () => {
  it("Is Calculator component present in DOM", () => {
    render(<Calculator />);
    const CalculatorComponent = screen.getByTestId("calculator");
    expect(CalculatorComponent).toBeDefined();
  });
  it("Testing cartValue input field register change", () => {
    render(<Calculator />);
    const cartValueInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/example: 15/i);
    fireEvent.change(cartValueInputElement, { target: { value: 20 } });
    expect(cartValueInputElement.value).toEqual("20");
  });
  it("Testing distance input field register change", () => {
    render(<Calculator />);
    const cartValueInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/example: 1200/i);
    fireEvent.change(cartValueInputElement, { target: { value: 1200 } });
    expect(cartValueInputElement.value).toEqual("1200");
  });
  it("Testing itemNumber input field register change", () => {
    render(<Calculator />);
    const cartValueInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/example: 4/i);
    fireEvent.change(cartValueInputElement, { target: { value: 8 } });
    expect(cartValueInputElement.value).toEqual("8");
  });
  it("Testing dateTime input field register change", () => {
    render(<Calculator />);
    const cartValueInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/dateTime/i);
    fireEvent.change(cartValueInputElement, {
      target: { value: "2023-06-14T00:00" },
    });
    expect(cartValueInputElement.value).toEqual("2023-06-14T00:00");
  });
});
