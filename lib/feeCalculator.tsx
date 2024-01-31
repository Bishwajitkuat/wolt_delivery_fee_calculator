import { FeeCalculatorInputType } from "./InputDataSchema";

export const feeCalculator = (userInput: FeeCalculatorInputType): number => {
  const { cartValue, distance, itemNumber, dateTime } = userInput;
  let deliveryFee: number = 0;

  // fee is zero if cartValue 200 or more
  if (cartValue >= 200) return deliveryFee;

  // if surcharge is applicable, if so added to deliveryFee
  if (cartValue < 10) deliveryFee = 10 - cartValue;

  // fees added for distance
  if (distance <= 1000) {
    deliveryFee += 2;
  } else {
    const reminder = (distance - 1000) % 500;
    const timesOf500m = Math.floor((distance - 1000) / 500);
    // fee for first 1000m
    deliveryFee += 2;
    // fee for the rest distance
    if (reminder === 0) {
      deliveryFee += timesOf500m * 1;
    } else {
      deliveryFee += (timesOf500m + 1) * 1;
    }
  }

  // surcharge for more than 4 items
  if (itemNumber > 4) deliveryFee += (itemNumber - 4) * 0.5;
  // bulk fee of 1.20 for more than 12 items
  if (itemNumber > 12) deliveryFee += 1.2;

  // Friday rush multiplyer : 3.00 - 7.00 PM
  const hour = dateTime.getHours();
  if (
    dateTime.getDay() === 5 &&
    ((hour >= 15 && hour <= 18) || (hour === 19 && dateTime.getMinutes() === 0))
  ) {
    deliveryFee *= 1.2;
  }

  // delivery can not be more than 15€
  if (deliveryFee > 15) deliveryFee = 15;

  // rounding up to 2 decimal points
  deliveryFee = Math.round((deliveryFee + Number.EPSILON) * 100) / 100;
  return deliveryFee;
};
