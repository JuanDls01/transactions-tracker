'use client';
import { useForm } from 'react-hook-form';
import { currencyOptions, transactionCategoryOptions } from './consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schemas';
import { z } from 'zod';
import { FormEvent, startTransition, useActionState, useEffect, useRef } from 'react';
import { onSubmitTransaction } from './actions';
import { ActionResponse } from '@/types/actions';
import { Currency, TransactionType } from '@prisma/client';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/ui/elements/button';
import { Textarea } from '@/ui/elements/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/elements/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { Input } from '@/ui/elements/input';
import { Alert, AlertDescription } from '@/ui/elements/alert';
import { ToggleGroup, ToggleGroupItem } from '@/ui/elements/toggle-group';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { Label } from '@/ui/elements/label';
import { useRouter } from 'next/navigation';

type TransactionFormSchema = Omit<z.output<typeof schema>, 'amount'> & {
  amount: string | number;
};

const initialState: ActionResponse<TransactionFormSchema> = {
  success: false,
  message: '',
};

const defaultFormValues = {
  type: TransactionType.INCOME,
  currency: Currency.ARS,
  amount: '',
};

type TransactionFormPropsType = {
  transaction?: TransactionFormSchema;
};

const TransactionForm = ({ transaction }: TransactionFormPropsType) => {
  // Use Action State to handle server action and server validations
  // state: server action response
  // formAction: dispatch server action
  // isPending: boolean to know if is loading
  const [state, formAction, isPending] = useActionState(onSubmitTransaction, initialState);
  const router = useRouter();

  const isEditing = !!transaction;

  // Use RHF to handle client side validations
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: transaction || {
      ...defaultFormValues,
      ...(state?.inputs ?? {}),
    },
    shouldUnregister: true,
  });

  const { errors } = form.formState;
  console.log(transaction);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(() => {
      // const formData = new FormData(formRef.current!);

      // We cannot dispatch an async fc of useActionState (onSubmitAction)
      // outside of an action context, so we use startTransition
      // reference: https://react.dev/reference/rsc/use-server#calling-a-server-function-outside-of-form
      startTransition(() => {
        const formData = new FormData(formRef.current!);
        if (isEditing && transaction?.id !== undefined) {
          formData.append('id', String(transaction?.id));
        }
        formAction(formData);
      });
    })(evt);
  };

  useEffect(() => {
    if (!isPending && state.success) {
      router.replace('/transactions');
      form.reset({
        ...defaultFormValues,
        category: form.getValues('category'),
        description: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state.success]);

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={onSubmit} ref={formRef} className='space-y-4 min-w-min'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem aria-label='Tipo de transacción'>
              <FormControl>
                <ToggleGroup
                  type='single'
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}
                  {...field}
                >
                  <ToggleGroupItem
                    value={TransactionType.INCOME}
                    className={cn(
                      'w-24 p-1 rounded-full transition-all text-sm',
                      field.value === TransactionType.INCOME
                        ? 'bg-[#2FF76D] text-white font-bold data-[state=on]:bg-[#2FF76D] data-[state=on]:text-white'
                        : 'bg-[#3DDC84]/20 text-[#3DDC84]',
                    )}
                  >
                    INGRESO
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value={TransactionType.EXPENSE}
                    className={cn(
                      'w-24 p-1 rounded-full transition-all text-sm',
                      field.value === TransactionType.EXPENSE
                        ? 'bg-[#B30C36] text-white font-bold hover:bg-[#B30C36] data-[state=on]:bg-[#B30C36] data-[state=on]:text-white'
                        : 'bg-[#B30C36]/20 hover:bg-[#B30C36]/20 hover:text-[#B30C36] text-[#B30C36]',
                    )}
                  >
                    EGRESO
                  </ToggleGroupItem>
                  <Input type='hidden' {...field} />
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <div className='flex items-center justify-center'>
            <p className='text-2xl text-muted-foreground'>$</p>
            <FormField
              control={form.control}
              name='amount'
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem aria-label='Monto'>
                  <FormControl>
                    <div className='flex items-center'>
                      <Input
                        placeholder='0'
                        {...field}
                        inputMode='decimal'
                        className={clsx(
                          'border-none focus:border-none focus-visible:ring-0',
                          'text-5xl px-2 text-right h-auto',
                        )}
                        style={{
                          width: `${Math.max(1, form.watch('amount').toString().length) + 0.75}ch`,
                          maxWidth: '8.5ch',
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='currency'
              render={({ field }) => {
                return (
                  <FormItem className='w-16' aria-label='Moneda'>
                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                      <FormControl className='p-1 text-lg'>
                        <SelectTrigger className='border-none focus:border-none focus:ring-0 focus-visible:ring-0'>
                          <SelectValue placeholder='Moneda' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencyOptions.map((t) => {
                          return (
                            <SelectItem key={t.key} value={t.value}>
                              {t.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
          </div>
          {errors.amount && (
            <p className={cn('text-xs font-medium text-destructive')}>{errors.amount.message}</p>
          )}
          {errors.type && <p className={cn('text-xs font-medium text-destructive')}>{errors.type.message}</p>}
          {errors.currency && (
            <p className={cn('text-xs font-medium text-destructive')}>{errors.currency.message}</p>
          )}
        </div>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => {
            return (
              <FormItem>
                <Label>Categoría</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una categoría' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transactionCategoryOptions.map((category) => {
                      return (
                        <SelectItem key={category.key} value={category.value}>
                          {category.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <Label>Descripción</Label>
              <FormControl>
                <Textarea placeholder='Escribe una breve descripción' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.message && (
          <Alert variant={state.success ? 'default' : 'destructive'}>
            {state.success && <CheckCircle2 className='h-4 w-4' />}
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
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
    </Form>
  );
};

export default TransactionForm;
