import { render, screen } from "@testing-library/react";
import DisplayDeliveryFee from "../components/DisplayDeliveryFee";

describe("Testing DisplayDeliveryFee component", () => {
  it("If we pass 4 as props, it will display 'Delivery price: 4.00€'", () => {
    render(<DisplayDeliveryFee deliveryFee={4} />);
    expect(screen.getByTestId("feeDisplayPra")).toHaveTextContent(
      /Delivery price: 4.00€/i
    );
  });
});
