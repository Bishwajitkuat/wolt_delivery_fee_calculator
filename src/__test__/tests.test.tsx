import { render, screen } from "@testing-library/react";
import Calculator from "../components/Calculator";
import { expect } from "vitest";
import { feeCalculator } from "../../lib/feeCalculator";

// Testing feeCalculator
describe("Testing feeCalculator with different distance values", () => {
  it("Distance less than 1km :cartVale:10€, distance: 100m, items: 1, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 10,
      distance: 100,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });

  it("Distance is 1km :cartVale:10€, distance: 1000m, items: 1, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });

  it("Distance more than 1km: cartVale:10€, distance: 1001m, items: 1, data: January 30, 2024 15:00:00, expected: 3", () => {
    const testVale = {
      cartValue: 10,
      distance: 1001,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(3);
  });
  it("Distance more than 1499m: cartVale:10€, distance: 1499m, items: 1, data: January 30, 2024 15:00:00, expected: 3", () => {
    const testVale = {
      cartValue: 10,
      distance: 1499,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(3);
  });
});

// small order surcharge
describe("Testing for small order surcharge", () => {
  it("Cart value is less than 10€ : cartVale:8€, distance: 1000m, items: 1, data: January 30, 2024 15:00:00, expected: 4", () => {
    const testVale = {
      cartValue: 8,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(4);
  });
  it("Cart value is 10€ : cartVale:10€, distance: 1000m, items: 1, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });

  it("Cart value is more than 10€ : cartVale:15€, distance: 1000m, items: 1, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 15,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });
});

// surcharge for additional items
describe("Testing surcharge for 5 or more items", () => {
  it("Item number is 4, item surcharge is 0 : cartVale:10€, distance: 1000m, items: 4, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 4,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });

  it("Item number is 5, item surcharge is 0.5€ : cartVale:10€, distance: 1000m, items: 5, data: January 30, 2024 15:00:00, expected: 2.5", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 5,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2.5);
  });
  it("Item number is 13, item surcharge is 5.70€ : cartVale:10€, distance: 1000m, items: 13, data: January 30, 2024 15:00:00, expected: 7.70", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 13,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(7.7);
  });
  it("Item number is 14, item surcharge is 6.20€ : cartVale:10€, distance: 1000m, items: 14, data: January 30, 2024 15:00:00, expected: 8.20", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 14,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(8.2);
  });
});

// fee is 0€ if cart value 200€ or more
describe("Testing delivery fee is 0€ for cart value 200€ or more", () => {
  it("Cart value is 199€: cartVale:199€, distance: 1000m, items: 1, data: January 30, 2024 15:00:00, expected: 2", () => {
    const testVale = {
      cartValue: 199,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });
  it("Cart value is 200€: cartVale:200€, distance: 5000m, items: 15, data: January 30, 2024 15:00:00, expected: 0", () => {
    const testVale = {
      cartValue: 200,
      distance: 5000,
      itemNumber: 15,
      dateTime: new Date("January 30, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(0);
  });
});

// testing rush hour multiplayer
describe("Test rush hour multiplayer", () => {
  it("Friday 3.00pm, fee will be multiplied by 1.2: cartVale:10€, distance: 1000m, items: 1, data: January 26, 2024 15:00:00, expected: 2.4", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 26, 2024 15:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2.4);
  });
  it("Friday 6.45pm, fee will be multiplied by 1.2: cartVale:10€, distance: 1000m, items: 1, data: January 26, 2024 18:45:00, expected: 2.4", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 26, 2024 18:45:00"),
    };
    expect(feeCalculator(testVale)).toBe(2.4);
  });
  it("Friday 7.00pm, fee will be multiplied by 1.2: cartVale:10€, distance: 1000m, items: 1, data: January 26, 2024 19:00:00, expected: 2.4", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 26, 2024 19:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(2.4);
  });
  it("Friday 7.01pm, fee will not multiplied by 1.2: cartVale:10€, distance: 1000m, items: 1, data: January 26, 2024 19:01:00, expected: 2", () => {
    const testVale = {
      cartValue: 10,
      distance: 1000,
      itemNumber: 1,
      dateTime: new Date("January 26, 2024 19:01:00"),
    };
    expect(feeCalculator(testVale)).toBe(2);
  });
});

// Testing total delivery fee can not be more than 15€
describe("Testing: delivery fee can not be more than 15€", () => {
  it("cartVale:185€, distance: 5000m, items: 15, data: January 26, 2024 19:00:00, expected: 15", () => {
    const testVale = {
      cartValue: 185,
      distance: 5000,
      itemNumber: 15,
      dateTime: new Date("January 26, 2024 19:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(15);
  });
  it("cartVale:199€, distance: 10000m, items: 15, data: January 26, 2024 19:00:00, expected: 15", () => {
    const testVale = {
      cartValue: 199,
      distance: 10000,
      itemNumber: 15,
      dateTime: new Date("January 26, 2024 19:00:00"),
    };
    expect(feeCalculator(testVale)).toBe(15);
  });
});

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
