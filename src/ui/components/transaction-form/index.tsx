'use client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Label from '../../elements/Label';
import Select from '../../elements/Select';
import TeaxtArea from '../../elements/TextArea';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { currencyOptions, transactionCategoryOptions, transactionTypeOptions } from './consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schemas';
import { z } from 'zod';
import { FormEvent, startTransition, useActionState, useRef } from 'react';
import { onSubmitAction } from './actions';
import { ActionResponse } from '@/types/actions';
import { Currency, TransactionCategory, TransactionType } from '@prisma/client';
import { IS_DECIMAL_NUMBER } from '@/utils/reg-exp';
import { Loader2 } from 'lucide-react';
import { Button } from '@/ui/elements/button';

type TransactionFormSchema = z.output<typeof schema>;

const initialState: ActionResponse<TransactionFormSchema> = {
  success: false,
  message: '',
};

const TransactionForm = () => {
  // Use Action State to handle server action and server validations
  // state: server action response
  // formAction: dispatch server action
  // isPedning: boolean to know if is loading
  const [state, formAction, isPending] = useActionState(onSubmitAction, initialState);

  // Use RHF to handle client side validations
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TransactionFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: TransactionType.INCOME,
      currency: Currency.ARS,
      category: TransactionCategory.FOOD,
      ...(state?.inputs ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit(() => {
      const formData = new FormData(formRef.current!);

      // We cannot dispatch an async fc of useActionState (onSubmitAction)
      // outside of an action context, so we use startTransition
      // reference: https://react.dev/reference/rsc/use-server#calling-a-server-function-outside-of-form
      startTransition(() => {
        formAction(formData);
      });
    })(evt);
  };

  return (
    <form action={formAction} onSubmit={onSubmit} ref={formRef}>
      <div className='space-y-1'>
        <Label>Movimiento</Label>
        <div className='flex space-x-2'>
          <select
            id='type'
            aria-label='Tipo de transacción'
            {...register('type', { required: true })}
            className={clsx(
              'appearance-none py-2 px-4 h-max w-fit',
              'text-base text-gray-500 sm:text-sm/6',
              'rounded-md outline outline-1 -outline-offset-1 outline-gray-300',
              'focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600',
            )}
          >
            {transactionTypeOptions.map((currency) => {
              return (
                <option key={currency.key} value={currency.value}>
                  {currency.label}
                </option>
              );
            })}
          </select>
          <div
            className={clsx(
              'flex items-center rounded-md bg-white pl-3',
              'outline outline-1 -outline-offset-1 outline-gray-300',
              'has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600',
            )}
          >
            <div className='shrink-0 select-none text-base text-gray-500 sm:text-sm/6 w-1/12'>$</div>
            <input
              id='amount'
              type='string'
              aria-label='Monto'
              placeholder='0.00'
              className={clsx(
                'text-base sm:text-sm/6 text-gray-900 appearance-none w-9/12',
                'border-none outline-none focus:outline-none focus:border-none',
                '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              )}
              {...register('amount', {
                required: true,
                pattern: IS_DECIMAL_NUMBER,
                setValueAs: (value) => {
                  if (typeof value === 'string') {
                    return parseFloat(value.replace(',', '.'));
                  }
                  return value;
                },
              })}
            />
            <div className='grid shrink-0 grid-cols-1 focus-within:relative h-full w-3/12'>
              <select
                id='currency'
                aria-label='Moneda'
                className='col-start-1 row-start-1 appearance-none rounded-md py-1.5 pl-3 pr-4  text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                {...register('currency', { required: true })}
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
                aria-hidden='true'
                className='col-start-1 row-start-1 pointer-events-none mr-2 size-3 self-center justify-self-end text-gray-500'
              />
            </div>
          </div>
        </div>
        <p role='alert' className='text-red-500 text-xs italic'>
          {errors.amount?.message ?? errors.currency?.message}
        </p>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='category'>Categoría</Label>
        <Select {...register('category', { required: true })} errorMessage={errors.category?.message}>
          {transactionCategoryOptions.map((category) => {
            return (
              <option key={category.key} value={category.value}>
                {category.label}
              </option>
            );
          })}
        </Select>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='description'>Descripción</Label>
        <TeaxtArea
          id='description'
          placeholder='Escribe una breve descripción'
          {...register('description')}
          errorMessage={errors.description?.message}
        />
      </div>
      {state?.message && <p className='text-red-500'>{state.message}</p>}
      <Button type='submit' disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className='animate-spin' />
            Guardando...
          </>
        ) : (
          'Guardar'
        )}
      </Button>
    </form>
  );
};

export default TransactionForm;
