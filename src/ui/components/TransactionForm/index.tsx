"use client";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Input from "../../elements/Input";
import Label from "../../elements/Label";
import Select from "../../elements/Select";
import TeaxtArea from "../../elements/TextArea";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { currencyOptions, transactionCategoryOptions } from "./consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schemas";
import { z } from "zod";
import { TransactionCategory } from "@/types/transactions";

type TransactionFormSchema = z.output<typeof schema>;

const TransactionForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TransactionFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: "ARS",
      category: TransactionCategory.Food,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2 sm:space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="amount">Monto</Label>
        <div
          className={clsx(
            "flex items-center rounded-md bg-white pl-3",
            "outline outline-1 -outline-offset-1 outline-gray-300",
            "has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600",
          )}
        >
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            $
          </div>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            className="text-base sm:text-sm/6 w-4/6 text-gray-900 border-none focus:outline-none focus:border-none pl-1"
            {...register("amount", { valueAsNumber: true, required: true })}
          />
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              id="currency"
              name="currency"
              aria-label="Currency"
              className="col-start-1 row-start-1 appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              {currencyOptions.map((currency) => {
                return (
                  <option key={currency.key} value={currency.value}>
                    {currency.label}
                  </option>
                );
              })}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
        <p role="alert" className="text-red-500 text-xs italic">
          {errors.amount?.message}
        </p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="category">Categoría</Label>
        <Select {...register("category", { required: true })}>
          {transactionCategoryOptions.map((category) => {
            return (
              <option key={category.key} value={category.value}>
                {category.label}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Descripción</Label>
        <TeaxtArea
          id="description"
          placeholder="Escribe una breve descripción"
          {...register("description")}
        />
      </div>
      <button
        type="submit"
        className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Guardar
      </button>
    </form>
  );
};

export default TransactionForm;
