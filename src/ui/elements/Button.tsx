import React from 'react';

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonPropsType) => {
  return (
    <button
      className='shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
