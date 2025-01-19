import { clsx } from 'clsx';

type TextAreaPropsType = {
  errorMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaDeprecated = ({ errorMessage, ...props }: TextAreaPropsType) => {
  return (
    <>
      <textarea
        className={clsx(
          'w-full min-w-0 py-1.5 px-3',
          'text-gray-900 sm:text-sm/6 text-base',
          'rounded-md outline outline-1 -outline-offset-1 outline-gray-300',
          'focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
        )}
        {...props}
      />
      {errorMessage && (
        <p role='alert' className='text-red-500 text-xs italic'>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default TextAreaDeprecated;
