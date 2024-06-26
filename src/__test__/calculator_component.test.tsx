import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "../components/Calculator";

// Testing components

describe("Testing Calculator Component", () => {
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
    const distanceInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/example: 1200/i);
    fireEvent.change(distanceInputElement, { target: { value: 1200 } });
    expect(distanceInputElement.value).toEqual("1200");
  });
  it("Testing itemNumber input field register change", () => {
    render(<Calculator />);
    const itemNumberInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/example: 4/i);
    fireEvent.change(itemNumberInputElement, { target: { value: 8 } });
    expect(itemNumberInputElement.value).toEqual("8");
  });
  it("Testing date input field register change", () => {
    render(<Calculator />);
    const dateInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/date/i);
    fireEvent.change(dateInputElement, {
      target: { value: "2023-06-14" },
    });
    expect(dateInputElement.value).toEqual("2023-06-14");
  });
  it("Testing time input field register change", () => {
    render(<Calculator />);
    const timeInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/time/i);
    fireEvent.change(timeInputElement, {
      target: { value: "14:20" },
    });
    expect(timeInputElement.value).toEqual("14:20");
  });
});
