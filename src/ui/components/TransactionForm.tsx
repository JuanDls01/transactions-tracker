import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Input from "../elements/Input";
import Label from "../elements/Label";
import Select from "../elements/Select";
import TeaxtArea from "../elements/TextArea";

export const transactionCategoryOptions = [
  { key: "leisure", value: "LEISURE", label: "🎮 Ocio" },
  { key: "health", value: "HEALTH", label: "🩺 Salud" },
  { key: "home", value: "HOME", label: "🏠 Hogar" },
  { key: "subscriptions", value: "SUBSCRIPTIONS", label: "📺 Subscripciones" },
  { key: "food", value: "FOOD", label: "🍽️ Comida" },
  {
    key: "savings/investments",
    value: "SAVINGS/INVESTMENTS",
    label: "💰 Ahooro / Inversiones",
  },
  { key: "education", value: "EDUCATION", label: "📚 Educación" },
  { key: "travel", value: "TRAVEL", label: "✈️ Viajes" },
  { key: "work", value: "WORK", label: "💼 Trabajo" },
  { key: "miscellaneous", value: "miscellaneous", label: "🧩 Otro" },
];

const currencyOptions = [
  { key: "ARS", value: "ars", label: "ARS" },
  { key: "BTC", value: "btc", label: "BTC" },
  { key: "USD", value: "usd", label: "USD" },
  { key: "USDT", value: "usdt", label: "USDT" },
];

const TransactionForm = () => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2 sm:space-y-4">
      <div className="space-y-1">
        <Label htmlFor="amount">Monto</Label>
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            $
          </div>
          <Input
            id="price"
            name="price"
            type="text"
            placeholder="0.00"
            className="text-base sm:text-sm/6 w-4/6 text-gray-900 border-none focus:outline-none focus:border-none pl-1 "
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
      </div>
      <div className="space-y-1">
        <Label htmlFor="category">Categoría</Label>
        <Select>
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
          name="description"
          placeholder="Escribe una breve descripción"
        />
      </div>
      <button
        className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Guardar
      </button>
    </form>
  );
};

export default TransactionForm;
