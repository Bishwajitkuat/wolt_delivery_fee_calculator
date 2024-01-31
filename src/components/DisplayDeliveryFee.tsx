export default function DisplayDeliveryFee({
  deliveryFee,
}: {
  deliveryFee: number;
}) {
  return (
    <p
      data-testid="feeDisplayPra"
      className="text-[1.2rem] text-slate-300 text-center"
    >
      Delivery price: {deliveryFee.toFixed(2)}€
    </p>
  );
}
