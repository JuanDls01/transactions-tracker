import React from "react";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonPropsType) => {
  return (
    <button
      {...props}
      className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    >
      Guardar
    </button>
  );
};

export default Button;
