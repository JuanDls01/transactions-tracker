import { envConfig } from "@/env.config";
import dynamoDbClient from "@/lib/dynamodb";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

const MovementsPage = async () => {
  const transactions = await getTransactions();
  return (
    <main>
      <section>
        <h2>Registro de transacciones:</h2>
        {transactions?.map((transaction, index) => (
          <p key={index}>{JSON.stringify(transaction)}</p>
        ))}
      </section>
    </main>
  );
};

const getTransactions = async () => {
  const params = {
    TableName: envConfig.table_name,
  };

  const command = new ScanCommand(params);

  try {
    const response = await dynamoDbClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error scanning items:", error);
    throw error;
  }
};

export default MovementsPage;
