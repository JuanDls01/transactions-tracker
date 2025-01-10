import { clsx } from "clsx";

type InputPropsType = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputPropsType) => {
  return (
    <input
      className={clsx(
        "w-full min-w-0 py-1.5 px-3",
        "text-gray-900 sm:text-sm/6 text-base",
        "rounded-md outline outline-1 -outline-offset-1 outline-gray-300",
        "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
      )}
      {...props}
    />
  );
};

export default Input;
