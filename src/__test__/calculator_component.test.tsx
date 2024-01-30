import { render, screen } from "@testing-library/react";
import Calculator from "../components/Calculator";

// Testing components

describe("Testing components", () => {
  it("Is Calculator component present in DOM", () => {
    render(<Calculator />);
    const CalculatorComponent = screen.getByTestId("calculator");
    expect(CalculatorComponent).toBeDefined();
  });
  it("Is content of delivery fee span empty at begining", () => {
    render(<Calculator />);
    expect(screen.getByTestId("deliveryFee").innerHTML).toBe("");
  });
});
