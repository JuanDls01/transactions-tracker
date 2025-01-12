import React from 'react';

type LabelPropsType = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...props }: LabelPropsType) => {
  return (
    <label className='block text-sm/6 font-medium text-gray-900' {...props}>
      {children}
    </label>
  );
};

export default Label;
