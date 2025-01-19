'use client';
import { useForm } from 'react-hook-form';
import { currencyOptions, transactionCategoryOptions, transactionTypeOptions } from './consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schemas';
import { z } from 'zod';
import { FormEvent, startTransition, useActionState, useEffect, useRef } from 'react';
import { onSubmitAction } from './actions';
import { ActionResponse } from '@/types/actions';
import { Currency, TransactionType } from '@prisma/client';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/ui/elements/button';
import { Textarea } from '@/ui/elements/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { Input } from '@/ui/elements/input';
import { Label } from '@/ui/elements/label';
import { Alert, AlertDescription } from '@/ui/elements/alert';

type TransactionFormSchema = Omit<z.output<typeof schema>, 'amount'> & {
  amount: string | number;
};

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
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: TransactionType.INCOME,
      currency: Currency.ARS,
      amount: '',
      ...(state?.inputs ?? {}),
    },
    shouldUnregister: true,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    form.handleSubmit(async () => {
      try {
        const formData = new FormData(formRef.current!);

        // We cannot dispatch an async fc of useActionState (onSubmitAction)
        // outside of an action context, so we use startTransition
        // reference: https://react.dev/reference/rsc/use-server#calling-a-server-function-outside-of-form
        startTransition(() => {
          formAction(formData);
        });
      } catch (err) {
        console.error(err);
      }
    })(evt);
  };

  useEffect(() => {
    if (!isPending && state.success) {
      form.reset({
        type: TransactionType.INCOME,
        currency: Currency.ARS,
        amount: '',
        category: undefined,
        description: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state.success]);

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={onSubmit} ref={formRef} className='space-y-4 min-w-min'>
        <div className='space-y-2'>
          <Label
            className={`${form.formState.errors.amount || form.formState.errors.type || form.formState.errors.currency ? 'text-destructive' : ''}`}
          >
            Movimiento
          </Label>
          <div className='flex space-x-2 ite w-full'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem className='w-1/6'>
                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                      <FormControl className='py-1 px-2'>
                        <SelectTrigger>
                          <SelectValue placeholder='Tipo' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionTypeOptions.map((t) => {
                          return (
                            <SelectItem key={t.key} value={t.value}>
                              {t.label}
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
              name='amount'
              defaultValue={undefined}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='0.00' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='currency'
              render={({ field }) => {
                return (
                  <FormItem className='w-3/12'>
                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                      <FormControl className='py-1 px-2'>
                        <SelectTrigger>
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
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
              <FormLabel>Descripción</FormLabel>
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
