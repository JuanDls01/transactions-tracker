import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";

type SelectPropsType = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, ...props }: SelectPropsType) => {
  return (
    <div className={clsx("grid grid-cols-1", "w-full min-w-0")}>
      <select
        id="category"
        name="category"
        aria-label="Categoría"
        {...props}
        className={clsx(
          "col-start-1 row-start-1 w-full",
          "py-1.5 pl-3 pr-7",
          "text-base text-gray-500 placeholder:text-gray-400 sm:text-sm/6",
          "appearance-none rounded-md outline outline-1 -outline-offset-1 outline-gray-300",
          "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
        )}
      >
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="col-start-1 row-start-1 pointer-events-none mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
      />
    </div>
  );
};

export default Select;
