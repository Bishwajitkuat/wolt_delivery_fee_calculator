import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputDataSchema, InputDataType } from "../../lib/InputDataSchema";

export default function Calculator() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputDataType>({
    resolver: zodResolver(InputDataSchema),
  });

  const userSubmitHandler: SubmitHandler<InputDataType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-[75vw] md:w-[50vw] grid justify-center gap-4 p-[3rem] rounded-md shadow-md shadow-gray-950 bg-gray-950/[0.7]">
      <h1 className="text-[2rem] text-center mb-[2rem] text-slate-200 font-semibold">
        Delivery Fee Calculator
      </h1>
      <form className="grid gap-6" onSubmit={handleSubmit(userSubmitHandler)}>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="cartValue">
            Cart value (€)
          </label>
          <input
            className="p-[0.5rem] bg-slate-300 text-slate-950 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
            type="text"
            id="cartValue"
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
            {...register("itemNumber")}
          />
          {errors.itemNumber && (
            <p className="text-red-500">{errors.itemNumber.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-slate-200 text-[1.2rem]" htmlFor="dateTime">
            Time
          </label>
          <input
            className="p-[0.5rem] bg-slate-300 text-slate-800 border border-1 rounded-md border-blue-500 focus:border-lime-500 focus:outline-none"
            type="datetime-local"
            id="dateTime"
            {...register("dateTime")}
          />
          {errors.dateTime && (
            <p className="text-red-500">{errors.dateTime.message}</p>
          )}
        </div>
        <button
          className="border mt-[1rem] py-[0.5rem] rounded-md"
          type="submit"
          disabled={isSubmitting}
        >
          Calculate delivery price
        </button>
      </form>
      <p>Delivery price is {}€</p>
    </div>
  );
}
