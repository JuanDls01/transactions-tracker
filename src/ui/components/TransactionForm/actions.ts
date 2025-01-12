'use server';
import { schema } from './schemas';
import { envConfig } from '@/env.config';
import { FIRST_USER_ID } from '@/utils/consts';
import { v4 as uuidv4 } from 'uuid';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoDbClient from '@/lib/dynamodb';
import { TransactionCategory } from '@/types/transactions';
import { ActionResponse } from '@/types/actions';

export const onSubmitAction = async (
  _: ActionResponse<typeof schema> | null,
  data: FormData,
): Promise<ActionResponse<typeof schema>> => {
  try {
    const formData = Object.fromEntries(data);
    const parsed = schema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: parsed.error.flatten().fieldErrors,
        inputs: formData,
      };
    }

    if (parsed.data.category === TransactionCategory.Car) {
      return {
        success: false,
        message: 'Category cannot be CAR for now',
      };
    }

    const { amount, category, description, currency } = parsed.data;

    // Create an ID for the item to be created
    const transactionId = uuidv4();

    const todayISO = new Date().toISOString();

    const params = {
      TableName: envConfig.table_name,
      Item: {
        userId: { S: FIRST_USER_ID }, // Partition Key
        id: { S: transactionId }, // Sort Key
        amount: { N: amount.toString() },
        currency: { S: currency },
        category: { S: category },
        date: { S: todayISO },
        description: { S: description ?? '' },
      },
    };

    const command = new PutItemCommand(params);
    await dynamoDbClient.send(command);
    return { success: true, message: 'Transaction saved successfully!' };
  } catch (err) {
    console.error('Error adding item: ', err);
    return { success: false, message: 'An unexpected error ocurred' };
  }
};
