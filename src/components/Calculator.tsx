import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FeeCalculatorInputType,
  InputDataSchema,
  InputDataType,
} from "../../lib/InputDataSchema";
import { feeCalculator } from "../../lib/feeCalculator";
import { useState } from "react";
import Heading from "./Heading";
import DisplayDeliveryFee from "./DisplayDeliveryFee";

export default function Calculator() {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputDataType>({
    resolver: zodResolver(InputDataSchema),
  });

  const userSubmitHandler: SubmitHandler<InputDataType> = (data) => {
    // validating the user inputs
    const validatedData = InputDataSchema.safeParse(data);
    // if validation is a success, I will send data to feeCalculator fuction
    if (validatedData.success) {
      // creating a data instance
      const dateTime = new Date(
        `${validatedData.data.date} ${validatedData.data.time}`
      );
      // creating an object which can be pass into feeCalculator function
      const dataForFeeCalculation: FeeCalculatorInputType = {
        cartValue: validatedData.data.cartValue,
        distance: validatedData.data.distance,
        itemNumber: validatedData.data.itemNumber,
        dateTime: dateTime,
      };
      // passing data into feeCalculator function and setting the return value for deliveryFee state
      const deliveryFee: number = feeCalculator(dataForFeeCalculation);
      setDeliveryFee(deliveryFee);
      // finally resetting the form new inputes
      reset();
    } else {
      // it will come here if something went wrong during data validation.
      alert(
        "Sorry! something went wrong during data validation, please try later!"
      );
    }
  };

  return (
    <div
      data-testid="calculator"
      className="w-[75vw] md:w-[50vw] min-w-[350px] grid justify-center gap-4 p-[3rem] rounded-md shadow-md shadow-gray-950 bg-gray-950/[0.7]"
    >
      <Heading title="Delivery Fee Calculator" />
      <form className="grid gap-6" onSubmit={handleSubmit(userSubmitHandler)}>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="cartValue">
            Cart value (€)
          </label>
          <input
            className="p-[0.5rem] bg-slate-300 text-slate-950 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
            type="text"
            id="cartValue"
            placeholder="example: 15"
            {...register("cartValue")}
          />
          {errors.cartValue && (
            <p className="text-red-500">{errors.cartValue.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="distance">
            Delivery distance (m)
          </label>
          <input
            className="p-[0.5rem] bg-slate-300 text-slate-800 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
            type="text"
            id="distance"
            placeholder="example: 1200"
            {...register("distance")}
          />
          {errors.distance && (
            <p className="text-red-500">{errors.distance.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="itemNumber">
            Amount of items
          </label>
          <input
            className="p-[0.5rem] bg-slate-300 text-slate-800 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
            type="text"
            id="itemNumber"
            placeholder="example: 4"
            {...register("itemNumber")}
          />
          {errors.itemNumber && (
            <p className="text-red-500">{errors.itemNumber.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="date">
            Time
          </label>
          <div className="flex gap-2 flex-nowrap">
            <input
              className="flex-grow p-[0.5rem] bg-slate-300 text-slate-800 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
              type="date"
              id="date"
              placeholder="date"
              {...register("date")}
            />{" "}
            <input
              className="p-[0.5rem] bg-slate-300 text-slate-800 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
              type="time"
              id="time"
              placeholder="time"
              {...register("time")}
            />
          </div>
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
          {errors.time && <p className="text-red-500">{errors.time.message}</p>}
        </div>
        <button
          className="text-gray-900 text-[1.2rem] font-semibold mt-[1rem] py-[0.5rem] rounded-md shadow-xl bg-[#27b4d4] hover:bg-gradient-to-br from-green-400 via-yellow-200 to-red-400"
          type="submit"
          disabled={isSubmitting}
        >
          Calculate delivery price
        </button>
      </form>
      <DisplayDeliveryFee deliveryFee={deliveryFee} />
    </div>
  );
}
