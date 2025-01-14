import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';

type SelectPropsType = {
  errorMessage?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ errorMessage, children, ...props }: SelectPropsType) => {
  return (
    <>
      <div className={clsx('grid grid-cols-1', 'min-w-0')}>
        <select
          {...props}
          className={clsx(
            'col-start-1 row-start-1 w-full',
            'py-2 pl-3 pr-7',
            'text-base text-gray-500 placeholder:text-gray-400 sm:text-sm/6',
            'appearance-none rounded-md outline outline-1 -outline-offset-1 outline-gray-300',
            'focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
          )}
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden='true'
          className='col-start-1 row-start-1 pointer-events-none mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
        />
      </div>
      {errorMessage && (
        <p role='alert' className='text-red-500 text-xs italic'>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default Select;
